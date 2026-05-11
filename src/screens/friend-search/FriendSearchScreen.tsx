import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../../context/user";
import { useConnectivity } from "../../context/ConnectivityContext";
import { databaseService } from "../../services/DatabaseService";
import {
  MatchInvitationPayload,
  supabaseService,
} from "../../services/SupabaseService";
import { FriendItem } from "../../components/friend-search/FriendItem";

import { createFriendSearchStyles } from "./friend-search.styles";
import FloatingGem from "../../components/home/FloatingGem";
import i18n from "../../i18n";

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
import UserAvatar from "../../components/ui/UserAvatar";
import { useAlert } from "../../context/AlertContext";

/** Generate a short random session id */
const makeSessionId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const POLL_INTERVAL_MS = 2_000; // check every 2 s
const SCAN_TIMEOUT_MS = 20_000; // give up after 20 s

const FriendSearchScreen: React.FC<Props> = ({ navigation, route }) => {
  const { gameType = "duo", quizType = "standard" } = route.params || {};
  const { friends, addFriend, username, avatar, churchName, city, profileId } = useUser();
  const { isOnline } = useConnectivity();
  const { colors, isLight } = useAppTheme();
  const { showAlert } = useAlert();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [incomingInvite, setIncomingInvite] = useState<MatchInvitationPayload | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "scanning" | "found" | "empty" | "timeout"
  >("idle");

  const sessionIdRef = useRef<string>("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const incomingInvitePollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const incomingInviteSubRef = useRef<any>(null);
  const lastIncomingInviteIdRef = useRef<string | null>(null);

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

        // 2. Search only ACTIVE players from the matchmaking pool
        const onlineMatched = isOnline
          ? await supabaseService.searchActivePlayersByName(text.trim())
          : [];
        
        // Filter and map online players
        const onlineFiltered = onlineMatched.map(p => ({
          id: p.profile_id || p.id,
          session_id: p.session_id,
          profile_id: p.profile_id,
          name: p.name,
          avatar: p.avatar,
          church: p.church,
          city: p.city,
          points: p.points || 0,
          status: "online",
          isLocal: false
        }));

        // Deduplicate: If multiple sessions exist for the same profile_id, keep the newest one
        const deduplicated = new Map();
        [...localMapped, ...onlineFiltered].forEach(item => {
          const key = item.profile_id || item.id;
          // Filter out yourself
          if (key === profileId) return;
          
          if (!deduplicated.has(key)) {
            deduplicated.set(key, item);
          }
        });

        const unified = Array.from(deduplicated.values());
        
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
    if (incomingInvitePollRef.current) {
      clearInterval(incomingInvitePollRef.current);
      incomingInvitePollRef.current = null;
    }
    if (incomingInviteSubRef.current) {
      incomingInviteSubRef.current.unsubscribe();
      incomingInviteSubRef.current = null;
    }
    if (sessionIdRef.current) {
      await supabaseService.leaveMatchmakingPool(sessionIdRef.current);
      sessionIdRef.current = "";
    }
  };

  /** Cancel current scan and reset to idle */
  const cancelScan = async () => {
    await stopScan();
    setSearchStatus("idle");
  };

  /** Start a real matchmaking scan */
  const startScan = async () => {
    if (!profileId) {
      showAlert({
        title: i18n.t("account_required"),
        message: i18n.t("multiplayer_online_msg"),
        buttons: [{ text: i18n.t("ok") }]
      });
      return;
    }
    if (!isOnline) {
      showAlert({
        title: i18n.t("offline_required_title"),
        message: i18n.t("offline_required_msg"),
        buttons: [{ text: i18n.t("ok") }]
      });
      return;
    }

    // Reset UI
    setSearch("");
    setResults([]);
    setSearchStatus("scanning");

    // Generate unique session id for this scan
    const sid = makeSessionId();
    sessionIdRef.current = sid;

    // Register current user in the matchmaking pool
    await supabaseService.joinMatchmakingPool(sid, {
      name: username || i18n.t("visitor"),
      avatar: avatar || "default",
      church: churchName,
      city: city,
      profile_id: profileId,
      game_type: gameType,
      quiz_type: quizType,
    });

    incomingInviteSubRef.current = supabaseService.subscribeToIncomingInvitations(
      profileId,
      (invitation) => {
        if (lastIncomingInviteIdRef.current === invitation.id) return;
        lastIncomingInviteIdRef.current = invitation.id;
        setIncomingInvite(invitation);
      },
    );

    incomingInvitePollRef.current = setInterval(async () => {
      const invitation = await supabaseService.getLatestPendingInvitation(profileId);
      if (!invitation) return;
      if (lastIncomingInviteIdRef.current === invitation.id) return;
      lastIncomingInviteIdRef.current = invitation.id;
      setIncomingInvite(invitation);
    }, 1500);

    // Poll for all available users
    pollRef.current = setInterval(async () => {
      try {
        const players = await supabaseService.findAllActivePlayers(sid, gameType, quizType);
        if (players.length > 0) {
          // Map all found users to our list
          const mapped = players
            .filter((p) => !!p.profile_id && p.profile_id !== profileId)
            .map(p => ({
            id: p.profile_id!,
            session_id: p.session_id,
            profile_id: p.profile_id,
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
        setSearchStatus("timeout");
      }
    }, SCAN_TIMEOUT_MS);
  };

  const inviteFriend = (friend: any) => {
    if (!isOnline) {
      showAlert({
        title: i18n.t("offline_required_title"),
        message: i18n.t("offline_required_msg"),
        buttons: [{ text: i18n.t("ok") }]
      });
      return;
    }

    navigation.navigate("Matchmaking", {
      mode: "invite",
      friendId: friend.id || friend.profile_id,
      friendName: friend.name,
      gameType,
      quizType,
    } as any);
  };

  const handleAcceptInvite = async () => {
    if (!incomingInvite) return;

    const invitation = incomingInvite;
    const mySessionId = sessionIdRef.current || makeSessionId();

    setIsJoining(true);
    setIncomingInvite(null);
    lastIncomingInviteIdRef.current = invitation.id;

    try {
      await supabaseService.acceptInvitation(invitation.id, mySessionId);
      await stopScan();

      const destination = invitation.quiz_type === "image" ? "OnlineImageQuiz" : "OnlineQuiz";
      navigation.replace(destination as any, {
        opponent: invitation.sender,
        mySessionId,
        opponentSessionId: invitation.sender.session_id,
      });
    } catch (err) {
      setIsJoining(false);
      showAlert({
        title: i18n.t("match_error"),
        message: i18n.t("join_failed"),
        buttons: [{ text: i18n.t("ok") }]
      });
    }
  };

  const handleDeclineInvite = async () => {
    if (!incomingInvite) return;

    const invitationId = incomingInvite.id;
    setIncomingInvite(null);
    lastIncomingInviteIdRef.current = invitationId;
    await supabaseService.declineInvitation(invitationId);
  };

  const handleAddFriend = (friend: any) => {
    addFriend(friend);
  };

  useEffect(() => {
    if (!isOnline) {
      stopScan();
    }
  }, [isOnline]);

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
            {i18n.t("no_players_found_msg")}
          </Text>
          <TouchableOpacity style={styles.retryBtn} onPress={startScan}>
            <Text style={styles.retryBtnText}>{i18n.t("retry")}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (searchStatus === "timeout") {
      return (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="timer-sand-empty"
            size={80}
            color={colors.surfaceSoft}
          />
          <Text style={styles.emptyText}>
            {i18n.t("search_timeout_msg")}
          </Text>
          <TouchableOpacity style={styles.retryBtn} onPress={startScan}>
            <Text style={styles.retryBtnText}>{i18n.t("retry")}</Text>
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
            {i18n.t("no_players_with_name")}
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
          {i18n.t("friend_search_empty_hint")}
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
          <Text style={styles.headerTitle}>{i18n.t("search_friends_title")}</Text>
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
              placeholder={i18n.t("search_by_name_placeholder")}
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
            <Text style={styles.scanButtonText}>{i18n.t("search_other_players_btn")}</Text>
          </TouchableOpacity>
        )}

        <View style={styles.content}>
          {searchStatus === "scanning" ? (
            <View style={styles.scanningContainer}>
              <View style={styles.radarWrapper}>
                <RadarSearch mode="match" />
              </View>
              <TouchableOpacity
                style={styles.cancelScanBtn}
                onPress={cancelScan}
              >
                <Text style={styles.cancelScanText}>{i18n.t("cancel")}</Text>
              </TouchableOpacity>
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

        <Modal visible={!!incomingInvite} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalAvatarWrap}>
                <UserAvatar
                  avatar={incomingInvite?.sender?.avatar}
                  size={88}
                  points={incomingInvite?.sender?.points || 0}
                />
              </View>
              <Text style={styles.modalTitle}>{incomingInvite?.sender?.name}</Text>
              <Text style={styles.modalSub}>
                {incomingInvite?.quiz_type === "image"
                  ? (i18n.t("duel_invitation_image") || "Duel Image Quiz!")
                  : (i18n.t("duel_invitation") || "Duel Quiz!")}
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.declineBtn]}
                  onPress={handleDeclineInvite}
                  disabled={isJoining}
                >
                  <Text style={[styles.btnText, { color: colors.text }]}>{i18n.t("decline")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.acceptBtn]}
                  onPress={handleAcceptInvite}
                  disabled={isJoining}
                >
                  <Text style={[styles.btnText, { color: colors.background }]}>{i18n.t("accept")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default FriendSearchScreen;
