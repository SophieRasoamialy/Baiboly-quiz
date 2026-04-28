import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  TouchableOpacity, 
  Dimensions, 
  Text, 
  FlatList, 
  ActivityIndicator,
  Modal,
  Image 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useUser } from "../../context/user";
import { supabaseService, MatchmakingPlayer } from "../../services/SupabaseService";
import { useAlert } from "../../context/AlertContext";

import { createMatchmakingStyles } from "./matchmaking.styles";
import { MatchFoundCard } from "../../components/matchmaking/MatchFoundCard";
import { RadarSearch } from "../../components/matchmaking/RadarSearch";
import FloatingGem from "../../components/home/FloatingGem";
import i18n from "../../i18n";
import { QUIZ_IMAGE_MAP } from "../../constants/quizImages";
import UserAvatar from "../../components/ui/UserAvatar";

const { width } = Dimensions.get("window");

type MatchmakingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Matchmaking"
>;

interface Props {
  navigation: MatchmakingScreenNavigationProp;
  route: any;
}

const makeSessionId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const POLL_INTERVAL_MS = 3_000;
const SCAN_TIMEOUT_MS = 20_000; // give up after 20 s

const MatchmakingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { mode, friendName, gameType = "duo", quizType = "standard" } = route.params;
  const [status, setStatus] = useState("lobby"); // lobby, found, timeout
  const [availablePlayers, setAvailablePlayers] = useState<MatchmakingPlayer[]>([]);
  const [incomingInvite, setIncomingInvite] = useState<any>(null);
  const [invitingPlayer, setInvitingPlayer] = useState<any>(null);
  const [opponent, setOpponent] = useState<any>(null);
  const [isJoining, setIsJoining] = useState(false);
  
  const { colors, isLight } = useAppTheme();
  const { username, avatar, churchName, city, profileId, points } = useUser();
  const { showAlert } = useAlert();
  const styles = createMatchmakingStyles(colors);

  const sessionIdRef = useRef<string>("");
  const lobbyPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handshakeSubRef = useRef<any>(null);
  const processedRef = useRef<boolean>(false);

  const stopLobbyPolling = () => {
    if (lobbyPollRef.current) {
      clearInterval(lobbyPollRef.current);
      lobbyPollRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const cleanup = async () => {
    stopLobbyPolling();
    if (handshakeSubRef.current) {
      handshakeSubRef.current.unsubscribe();
      handshakeSubRef.current = null;
    }
    if (sessionIdRef.current) {
      await supabaseService.leaveMatchmakingPool(sessionIdRef.current);
      sessionIdRef.current = "";
    }
  };

  useEffect(() => {
    startLobby();
    return () => {
      cleanup();
    };
  }, []);

  const startLobby = async () => {
    const sid = makeSessionId();
    sessionIdRef.current = sid;

    // 1. Join the cloud pool
    await supabaseService.joinMatchmakingPool(sid, {
      name: username || i18n.t("visitor"),
      avatar: avatar || "default",
      church: churchName,
      city: city,
      profile_id: profileId,
      game_type: gameType,
      quiz_type: quizType,
    });

    // 2. Subscribe to "Handshake" (Detect Invitations or Acceptances)
    handshakeSubRef.current = supabaseService.subscribeToMyMatch(sid, async (payload) => {
      if (!payload) return;

      if (payload.type === "invitation") {
        console.log("Received Invitation from:", payload.sender.name, "for", payload.quiz_type);
        // Store the full payload so we know the game mode
        setIncomingInvite(payload);
      } else if (payload.type === "accepted") {
        console.log("Invitation Accepted by:", payload.sender.name);
        setOpponent(payload.sender);
        setStatus("found");
        stopLobbyPolling();
        handleMatchFound(payload.sender, payload.sender.session_id, payload.quiz_type);
      }
    });

    // 3. Periodic Poll for Lobby List (for "random" mode or just seeing others)
    lobbyPollRef.current = setInterval(async () => {
      try {
        const players = await supabaseService.findAllActivePlayers(sid, gameType, quizType);
        
        // Deduplicate by profile_id so each person only appears once
        const deduplicated = new Map();
        players.forEach(p => {
          // Skip if it's our own profile
          if (p.profile_id === profileId) return;
          
          // If multiple sessions exist for the same profile, keep the most recent one
          if (!deduplicated.has(p.profile_id)) {
            deduplicated.set(p.profile_id, p);
          }
        });

        const filtered = Array.from(deduplicated.values());
        setAvailablePlayers(filtered as MatchmakingPlayer[]);
        
        // If we found people, clear the timeout
        if (filtered.length > 0 && timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      } catch (err) {
        console.error("Lobby poll error:", err);
      }
    }, POLL_INTERVAL_MS);

    // 4. Set the 20s timeout
    timeoutRef.current = setTimeout(async () => {
      if (status === "lobby" && availablePlayers.length === 0) {
        stopLobbyPolling();
        setStatus("timeout");
      }
    }, SCAN_TIMEOUT_MS);
  };

  const handleInvite = async (player: MatchmakingPlayer) => {
    setInvitingPlayer(player);
    try {
      await supabaseService.sendInvitation(player.session_id, {
        profile_id: profileId!,
        session_id: sessionIdRef.current,
        name: username || "Mpilalao",
        avatar: avatar || "default",
        church: churchName,
        city: city,
        points: points,
        game_type: gameType,
        quiz_type: quizType,
      });
    } catch (err) {
      setInvitingPlayer(null);
      showAlert({
        title: i18n.t("match_error"),
        message: i18n.t("invite_failed"),
        buttons: [{ text: "OK" }]
      });
    }
  };

  const handleAccept = async () => {
    if (!incomingInvite) return;
    setIsJoining(true);
    const payload = incomingInvite;
    setIncomingInvite(null);

    try {
      await supabaseService.acceptInvitation(payload.sender.session_id, {
        profile_id: profileId!,
        session_id: sessionIdRef.current,
        name: username || "Mpilalao",
        avatar: avatar || "default",
        church: churchName,
        city: city,
        points: points,
        game_type: payload.game_type, // Sync to inviter's mode
        quiz_type: payload.quiz_type,
      });
      // Now both players should have information to start the game
      handleMatchFound(payload.sender, payload.sender.session_id, payload.quiz_type);
    } catch (err) {
      setIsJoining(false);
      showAlert({
        title: i18n.t("match_error"),
        message: i18n.t("join_failed"),
        buttons: [{ text: "OK" }]
      });
    }
  };

  const handleDecline = async () => {
    setIncomingInvite(null);
    await supabaseService.declineInvitation(sessionIdRef.current);
  };

  const handleMatchFound = (selectedOpponent: any, opponentSessionId: string, remoteQuizType?: string) => {
    if (processedRef.current) return;
    processedRef.current = true;

    // Use the remote quiz type if provided (e.g. from an invitation)
    const activeQuizType = remoteQuizType || quizType;

    setOpponent(selectedOpponent);
    setStatus("found");

    setTimeout(() => {
      const destination = activeQuizType === "image" ? "OnlineImageQuiz" : "OnlineQuiz";
      navigation.replace(destination as any, { 
        opponent: selectedOpponent,
        mySessionId: sessionIdRef.current,
        opponentSessionId: opponentSessionId
      });
    }, 3000);
  };

  const gemsConfig = [
    { x: width * 0.15, size: 16, delay: 0, duration: 8000, opacity: 0.5 },
    { x: width * 0.8, size: 12, delay: 2500, duration: 7000, opacity: 0.4 },
  ];

  const renderPlayerItem = ({ item }: { item: MatchmakingPlayer }) => (
    <View style={styles.playerCard}>
      <View style={styles.centerAvatar}>
        <UserAvatar 
          avatar={item.avatar} 
          size={50} 
          points={item.points || 0} 
        />
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.name}</Text>
        <Text style={styles.playerMeta}>{item.city || i18n.t("unknown_location")}</Text>
      </View>
      <TouchableOpacity 
        style={styles.inviteBtn}
        onPress={() => handleInvite(item)}
      >
        <Text style={styles.inviteBtnText}>{i18n.t("invite_btn_text")}</Text>
      </TouchableOpacity>
    </View>
  );

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

      {gemsConfig.map((gem, index) => (
        <FloatingGem key={index} {...gem} isLight={isLight} />
      ))}

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelBtn}
          >
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          <View style={styles.mainGroup}>
            {status === "lobby" ? (
              <View style={styles.playerList}>
                <View style={styles.lobbyTitleGroup}>
                  <Text style={styles.lobbyTitle}>{i18n.t("online_players")}</Text>
                  <Text style={styles.lobbySub}>{i18n.t("choose_opponent")}</Text>
                </View>

                {availablePlayers.length > 0 ? (
                  <FlatList
                    data={availablePlayers}
                    renderItem={renderPlayerItem}
                    keyExtractor={(item) => item.session_id}
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <RadarSearch mode="match" />
                    <TouchableOpacity
                      style={styles.cancelScanBtn}
                      onPress={() => navigation.goBack()}
                    >
                      <Text style={styles.cancelScanText}>{i18n.t("cancel")}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : status === "timeout" ? (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="timer-sand-empty"
                  size={80}
                  color={colors.surfaceSoft}
                />
                <Text style={styles.emptyText}>
                  {i18n.t("search_timeout_msg")}
                </Text>
                
                <View style={styles.timeoutButtons}>
                  <TouchableOpacity 
                    style={styles.secondaryBtn} 
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.secondaryBtnText}>{i18n.t("cancel")}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.retryBtn} 
                    onPress={() => {
                      setStatus("lobby");
                      startLobby();
                    }}
                  >
                    <Text style={styles.retryBtnText}>{i18n.t("retry")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <MatchFoundCard opponent={opponent} />
            )}
          </View>
        </View>

        {/* Incoming Invitation Modal */}
        <Modal
          visible={!!incomingInvite}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.opponentAvatarCircle}>
                <UserAvatar 
                  avatar={incomingInvite?.sender?.avatar} 
                  size={90} 
                  points={incomingInvite?.sender?.points || 0} 
                />
              </View>
              <Text style={styles.modalTitle}>{incomingInvite?.sender?.name}</Text>
              <Text style={styles.modalSub}>
                {incomingInvite?.quiz_type === "image" 
                  ? i18n.t("duel_invitation_image") || "Duel Image Quiz!"
                  : i18n.t("duel_invitation") || "Duel Quiz!"}
              </Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalBtn, styles.declineBtn]}
                  onPress={handleDecline}
                >
                  <Text style={[styles.btnText, { color: colors.text }]}>{i18n.t("decline")}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalBtn, styles.acceptBtn]}
                  onPress={handleAccept}
                >
                  <Text style={[styles.btnText, { color: colors.background }]}>{i18n.t("accept")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Waiting Response Modal */}
        <Modal
          visible={!!invitingPlayer}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.modalTitle}>{i18n.t("waiting_response")}</Text>
              <Text style={styles.modalSub}>{i18n.t("sending_invite_to", { name: invitingPlayer?.name })}</Text>
              
              <TouchableOpacity 
                style={[styles.modalBtn, styles.declineBtn, { width: "100%" }]}
                onPress={() => setInvitingPlayer(null)}
              >
                <Text style={[styles.btnText, { color: colors.text }]}>{i18n.t("cancel")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default MatchmakingScreen;
