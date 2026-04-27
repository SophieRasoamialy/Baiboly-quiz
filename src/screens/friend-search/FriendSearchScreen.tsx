import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../../context/user";
import { databaseService } from "../../services/DatabaseService";
import { supabaseService } from "../../services/SupabaseService";
import { FriendItem } from "../../components/friend-search/FriendItem";

import { createFriendSearchStyles } from "./friend-search.styles";
import FloatingGem from "../../components/home/FloatingGem";

const { width } = Dimensions.get("window");

type FriendSearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FriendSearch"
>;

interface Props {
  navigation: FriendSearchScreenNavigationProp;
  route: any;
}

import { RadarSearch } from "../../components/matchmaking/RadarSearch";
import { useAppTheme } from "../../hooks/useAppTheme";

/** Generate a short random session id */
const makeSessionId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const POLL_INTERVAL_MS = 2_000; // check every 2 s
const SCAN_TIMEOUT_MS = 30_000; // give up after 30 s

const FriendSearchScreen: React.FC<Props> = ({ navigation, route }) => {
  const { gameType = "duo", quizType = "standard" } = route.params || {};
  const { friends, addFriend, username, avatar, churchName, city, profileId } = useUser();
  const { colors, isLight } = useAppTheme();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "scanning" | "found" | "empty"
  >("idle");

  const sessionIdRef = useRef<string>("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const styles = createFriendSearchStyles(colors);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopScan();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Search both local friends and online profiles */
  const handleSearch = (text: string) => {
    setSearch(text);
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (text.trim().length < 2) {
      setResults([]);
      setSearchStatus("idle");
      return;
    }

    setSearchStatus("scanning");

    debounceTimerRef.current = setTimeout(async () => {
      try {
        // 1. Search local SQLite friends
        const localMatched = await databaseService.searchFriends(text.trim());
        const localMapped = localMatched.map((f: any) => ({ ...f, isLocal: true, status: "online" }));

        // 2. Search online profiles from Supabase
        const onlineMatched = await supabaseService.searchProfilesByName(text.trim());
        
        // Filter out those already in local results to avoid duplicates
        const onlineFiltered = onlineMatched.filter(op => 
          !localMapped.find(lp => lp.id === op.id || (op.profile_id && lp.id === op.profile_id))
        ).map(p => ({
          id: p.id,
          profile_id: p.id,
          name: p.name,
          avatar: p.avatar,
          church: p.church,
          city: p.city,
          points: p.points || 0,
          status: "online", // Assume online if searchable, they'll check connection on invite
          isLocal: false
        }));

        const unified = [...localMapped, ...onlineFiltered];
        
        // Background: Update local friends' points if they appear in online results
        onlineMatched.forEach(async (p) => {
          const isFriend = localMapped.find(f => f.id === p.id);
          if (isFriend) {
            await databaseService.addFriend({
              id: p.id,
              name: p.name,
              avatar: p.avatar,
              church: p.church,
              city: p.city,
              points: p.points
            });
          }
        });

        setResults(unified);
        setSearchStatus(unified.length > 0 ? "found" : "empty");
      } catch (err) {
        console.error("Global search error:", err);
      }
    }, 500); // 500ms debounce
  };

  /** Stop polling & clean up the pool entry */
  const stopScan = async () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (sessionIdRef.current) {
      await supabaseService.leaveMatchmakingPool(sessionIdRef.current);
      sessionIdRef.current = "";
    }
  };

  /** Start a real matchmaking scan */
  const startScan = async () => {
    // Reset UI
    setSearch("");
    setResults([]);
    setSearchStatus("scanning");

    // Generate unique session id for this scan
    const sid = makeSessionId();
    sessionIdRef.current = sid;

    // Register current user in the matchmaking pool
    await supabaseService.joinMatchmakingPool(sid, {
      name: username || "Mpilalao",
      avatar: avatar || "default",
      church: churchName,
      city: city,
      profile_id: profileId,
      game_type: gameType,
      quiz_type: quizType,
    });

    // Poll for all available users
    pollRef.current = setInterval(async () => {
      try {
        const players = await supabaseService.findAllActivePlayers(sid, gameType, quizType);
        if (players.length > 0) {
          // Map all found users to our list
          const mapped = players.map(p => ({
            id: p.profile_id || p.session_id,
            session_id: p.session_id,
            name: p.name,
            avatar: p.avatar,
            church: p.church,
            city: p.city,
            points: p.points || 0,
            status: "online",
          }));
          setResults(mapped);
          setSearchStatus("found");
        }
      } catch (err) {
        console.error("Matchmaking poll error:", err);
      }
    }, POLL_INTERVAL_MS);

    // Timeout — no one found
    timeoutRef.current = setTimeout(async () => {
      if (searchStatus === "scanning" || pollRef.current) {
        await stopScan();
        setSearchStatus("empty");
      }
    }, SCAN_TIMEOUT_MS);
  };

  const inviteFriend = (friend: any) => {
    navigation.navigate("Matchmaking", {
      mode: "invite",
      friendId: friend.id || friend.profile_id,
      friendName: friend.name,
    } as any);
  };

  const handleAddFriend = (friend: any) => {
    addFriend(friend);
  };

  const gemsConfig = [
    { x: width * 0.1, size: 12, delay: 0, duration: 8000, opacity: 0.4 },
    { x: width * 0.9, size: 16, delay: 2000, duration: 9000, opacity: 0.5 },
  ];

  const renderEmptyState = () => {
    if (searchStatus === "empty") {
      return (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="cloud-search-outline"
            size={80}
            color={colors.surfaceSoft}
          />
          <Text style={styles.emptyText}>
            Tsy nisy mpilalao hita mikaroka namana avy hatrany.{"\n"}
            Andramo indray afaka fotoana voaditra.
          </Text>
          <TouchableOpacity style={styles.retryBtn} onPress={startScan}>
            <Text style={styles.retryBtnText}>ANDRAMO INDRAY</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (search.length > 0 && results.length === 0) {
      return (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="account-search-outline"
            size={80}
            color={colors.surfaceSoft}
          />
          <Text style={styles.emptyText}>
            Tsy nisy mpilalao hita amin'io anarana io.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <MaterialCommunityIcons
          name="human-greeting-variant"
          size={80}
          color={colors.surfaceSoft}
        />
        <Text style={styles.emptyText}>
          Ampidiro ny anaran'ny namanao{"\n"}na karohy ireo mpilalao hafa eo
          akaikinao.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style={isLight ? "dark" : "light"} />

      <LinearGradient
        colors={
          isLight
            ? [colors.background, colors.backgroundSecondary]
            : [colors.background, colors.backgroundSecondary, colors.background]
        }
        style={styles.backgroundFill}
      />

      {!isLight && (
        <>
          <View pointerEvents="none" style={styles.glowLeft} />
          <View pointerEvents="none" style={styles.glowRight} />
        </>
      )}

      {gemsConfig.map((gem, index) => (
        <FloatingGem key={index} {...gem} isLight={isLight} />
      ))}

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mikaroka Namana</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={colors.textMuted}
            />
            <TextInput
              style={styles.input}
              placeholder="Hikaroka amin'ny anarana..."
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {searchStatus === "idle" && search.length === 0 && (
          <TouchableOpacity
            style={styles.scanButton}
            onPress={startScan}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="account-search"
              size={24}
              color={isLight ? colors.white : colors.primary}
            />
            <Text style={styles.scanButtonText}>MIKAROKA MPILALAO HAFA</Text>
          </TouchableOpacity>
        )}

        <View style={styles.content}>
          {searchStatus === "scanning" ? (
            <View style={styles.scanningContainer}>
              <View style={styles.radarWrapper}>
                <RadarSearch mode="match" />
              </View>
            </View>
          ) : (
            <FlatList
              data={results}
              renderItem={({ item }) => (
                <View>
                  <FriendItem
                    item={item}
                    onInvite={inviteFriend}
                    onAddFriend={handleAddFriend}
                    isFriend={friends.some((f) => f.id === item.id || (item.profile_id && f.id === item.profile_id))}
                    styles={styles}
                    colors={colors}
                  />
                </View>
              )}
              keyExtractor={(item) => item.id || item.session_id}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={renderEmptyState()}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FriendSearchScreen;
