import React from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../../context/user/UserContext";
import { styles } from "./ranking.styles";
import { TopPlayerPodium } from "../../components/ranking/TopPlayerPodium";
import { PlayerListItem } from "../../components/ranking/PlayerListItem";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/ui/BackButton";
import FloatingGem from "../../components/home/FloatingGem";
import { supabaseService } from "../../services/SupabaseService";

interface RankingPlayer {
  id: string;
  name: string;
  score: number;
  avatar: string;
  rank: number;
}

const { width } = Dimensions.get("window");

const RankingScreen = () => {
  const { colors, theme, points, username, avatar, isLoggedIn, profileId, syncProfile } = useUser();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isLight = theme === "light";
  const [players, setPlayers] = React.useState<RankingPlayer[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isLoggedIn]);

  const buildLeaderboard = React.useCallback(
    (profiles: Array<{ id: string; name: string; avatar: string | null; points: number }>): RankingPlayer[] => {
      const normalizedPlayers = profiles
        .filter((profile) => profile.id && profile.name)
        .map((profile) => ({
          id: profile.id,
          name: profile.id === profileId ? username || profile.name || "Izaho" : profile.name || "Mpilalao",
          score: profile.id === profileId ? points : profile.points || 0,
          avatar: profile.id === profileId ? avatar || profile.avatar || "abraham" : profile.avatar || "abraham",
          rank: 0,
        }));

      const hasCurrentUser =
        !!profileId && normalizedPlayers.some((player) => player.id === profileId);

      if (profileId && username && !hasCurrentUser) {
        normalizedPlayers.push({
          id: profileId,
          name: username,
          score: points,
          avatar: avatar || "abraham",
          rank: 0,
        });
      }

      return normalizedPlayers
        .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
        .map((player, index) => ({
          ...player,
          rank: index + 1,
        }));
    },
    [avatar, points, profileId, username],
  );

  const fetchLeaderboard = React.useCallback(
    async (refresh = false) => {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoadingLeaderboard(true);
      }

      setLoadError(null);

      try {
        if (isLoggedIn) {
          await syncProfile();
        }

        const leaderboard = await supabaseService.getLeaderboard(50);
        setPlayers(buildLeaderboard(leaderboard));
      } catch (error) {
        console.error("Failed to load leaderboard", error);
        setPlayers(buildLeaderboard([]));
        setLoadError("Tsy azo ny laharana amin'izao. Andramo indray avy eo.");
      } finally {
        if (refresh) {
          setIsRefreshing(false);
        } else {
          setIsLoadingLeaderboard(false);
        }
      }
    },
    [buildLeaderboard, isLoggedIn, syncProfile],
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchLeaderboard();
    }, [fetchLeaderboard]),
  );

  if (!isLoggedIn) {
    // ... (Login prompt UI remains similar, just applying theme colors)
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style={isLight ? "dark" : "light"} />
        
        <SafeAreaView style={[styles.navBar, { paddingHorizontal: 20 }]} edges={["top"]}>
          <BackButton colors={colors} onPress={() => navigation.goBack()} size={26} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Laharana Globaly</Text>
        </SafeAreaView>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <MaterialCommunityIcons name="account-lock" size={80} color={colors.primary} style={{ marginBottom: 20 }} />
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.text, textAlign: 'center', marginBottom: 10 }}>Miditra ho mpilalao</Text>
          <Text style={{ fontSize: 16, color: colors.textSecondary, textAlign: 'center', marginBottom: 30 }}>Mila mifandray amin'ny kaontinao ianao vao afaka mijery ny filaharana eran-tany.</Text>
          <TouchableOpacity 
            style={{ backgroundColor: colors.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 }}
            onPress={() => navigation.navigate("Auth")}
          >
            <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 16 }}>Hiditra / Hisoratra anarana</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Reorder top 3 for the podium layout: [2nd, 1st, 3rd]
  const podiumPlayers = React.useMemo(() => {
    const top3 = players.slice(0, 3);
    if (top3.length < 3) return top3;
    return [top3[1], top3[0], top3[2]];
  }, [players]);

  const remaining = players.slice(3);

  const gems = [
    { x: width * 0.1, size: 14, delay: 0, duration: 6000, opacity: 0.35 },
    { x: width * 0.8, size: 20, delay: 1500, duration: 8000, opacity: 0.4 },
    { x: width * 0.4, size: 16, delay: 3000, duration: 10000, opacity: 0.25 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isLight ? "dark" : "light"} />

      <LinearGradient 
        colors={isLight 
          ? [colors.primary || "#10B981", colors.primaryDark || "#065F46"] 
          : [colors.backgroundSecondary || "#0F172A", colors.background || "#020617"]
        } 
        style={styles.header}
      >
        <View style={styles.headerGlow} />
        
        {gems.map((gem, i) => (
          <FloatingGem key={i} {...gem} isLight={isLight} />
        ))}

        <SafeAreaView style={styles.navBar} edges={["top"]}>
          <BackButton 
            colors={isLight ? { ...colors, text: colors.white } : colors} 
            onPress={() => navigation.goBack()} 
            variant="glass"
            size={26}
          />
          <Text style={[styles.headerTitle, { color: isLight ? colors.white : colors.text }]}>Laharana Globaly</Text>
        </SafeAreaView>

        <Animated.View 
          style={[
            styles.topThreeContainer, 
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          {podiumPlayers.map((player) => (
            <TopPlayerPodium key={player.id} player={player} colors={colors} />
          ))}
        </Animated.View>
      </LinearGradient>

      <Animated.ScrollView 
        contentContainerStyle={styles.listContent}
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => fetchLeaderboard(true)}
            tintColor={colors.primary}
          />
        }
      >
        {isLoadingLeaderboard ? (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ marginTop: 12, color: colors.textSecondary }}>
              Maka ny laharana farany...
            </Text>
          </View>
        ) : (
          <>
            {loadError ? (
              <View
                style={{
                  marginBottom: 16,
                  padding: 14,
                  borderRadius: 16,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.textSecondary, textAlign: "center" }}>
                  {loadError}
                </Text>
              </View>
            ) : null}

            {players.length === 0 ? (
              <View style={{ paddingVertical: 40, alignItems: "center" }}>
                <Text style={{ color: colors.textSecondary, textAlign: "center" }}>
                  Tsy mbola misy mpilalao hita ao amin&apos;ny laharana.
                </Text>
              </View>
            ) : (
              remaining.map((player) => (
                <PlayerListItem key={player.id} player={player} colors={colors} />
              ))
            )}
          </>
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default RankingScreen;
