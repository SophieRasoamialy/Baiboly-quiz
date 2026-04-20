import React from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../../context/user/UserContext";
import { styles } from "./ranking.styles";
import { TopPlayerPodium } from "../../components/ranking/TopPlayerPodium";
import { PlayerListItem } from "../../components/ranking/PlayerListItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "../../components/ui/BackButton";

interface RankingPlayer {
  id: string;
  name: string;
  score: number;
  avatar: string;
  rank: number;
}


const RankingScreen = () => {
  const { colors, theme, points, username, avatar, isLoggedIn } = useUser();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isLight = theme === "light";

  if (!isLoggedIn) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style={isLight ? "dark" : "light"} />
        
        <SafeAreaView style={[styles.navBar, { paddingHorizontal: 20 }]} edges={["top"]}>
          <BackButton 
            colors={colors} 
            onPress={() => navigation.goBack()} 
            size={26}
          />
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Laharana Globaly
          </Text>
        </SafeAreaView>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <MaterialCommunityIcons name="account-lock" size={80} color={colors.primary} style={{ marginBottom: 20 }} />
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.text, textAlign: 'center', marginBottom: 10 }}>
            Miditra ho mpilalao
          </Text>
          <Text style={{ fontSize: 16, color: colors.textSecondary, textAlign: 'center', marginBottom: 30 }}>
            Mila mifandray amin'ny kaontinao ianao vao afaka mijery ny filaharana eran-tany sy mampitaha ny vokatanao amin'ny hafa.
          </Text>
          <TouchableOpacity 
            style={{ 
              backgroundColor: colors.primary, 
              paddingHorizontal: 40, 
              paddingVertical: 15, 
              borderRadius: 30,
              elevation: 5,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8
            }}
            onPress={() => navigation.navigate("Auth")}
          >
            <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 16 }}>Hiditra / Hisoratra anarana</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const allPlayers = React.useMemo((): RankingPlayer[] => {
    return [{
      id: 'me',
      name: username || "Izaho",
      score: points,
      avatar: avatar || "account-star",
      rank: 1
    }];
  }, [points, username, avatar]);

  const topThree = allPlayers.slice(0, 3);
  const remaining = allPlayers.slice(3);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isLight ? "dark" : "light"} />

      <LinearGradient colors={[colors.primary, "#1A237E"]} style={styles.header}>
        <SafeAreaView style={styles.navBar} edges={["top"]}>
          <BackButton 
            colors={colors} 
            onPress={() => navigation.goBack()} 
            variant="glass"
            size={26}
          />

          <Text style={[styles.headerTitle, { color: colors.white }]}>
            Laharana Globaly
          </Text>
        </SafeAreaView>

        <View style={[styles.topThreeContainer, { marginTop: 20 }]}>
          {topThree.map((player) => (
            <TopPlayerPodium key={player.id} player={player} colors={colors} />
          ))}
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.listContent}>
        {remaining.map((player) => (
          <PlayerListItem key={player.id} player={player} colors={colors} />
        ))}
      </ScrollView>
    </View>
  );
};

export default RankingScreen;
