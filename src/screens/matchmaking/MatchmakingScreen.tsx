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

const POLL_INTERVAL_MS = 5_000;
const SCAN_TIMEOUT_MS = 60_000;

const MatchmakingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { mode, friendName, gameType = "duo", quizType = "standard" } = route.params;
  const [status, setStatus] = useState("lobby"); // lobby, found
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
  const handshakeSubRef = useRef<any>(null);
  const processedRef = useRef<boolean>(false);

  const stopLobbyPolling = () => {
    if (lobbyPollRef.current) {
      clearInterval(lobbyPollRef.current);
      lobbyPollRef.current = null;
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
      name: username || "Mpilalao",
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
        console.log("Received Invitation from:", payload.sender.name);
        setIncomingInvite(payload.sender);
      } else if (payload.type === "acceptance") {
        console.log("Invitation Accepted by:", payload.partner.name);
        setOpponent(payload.partner);
        setStatus("found");
        stopLobbyPolling();
      }
    });

    // 3. Periodic Poll for Lobby List (for "random" mode or just seeing others)
    lobbyPollRef.current = setInterval(async () => {
      try {
        const players = await supabaseService.findAllActivePlayers(sid, gameType, quizType);
        setAvailablePlayers(players);

        // If in "random" mode and someone found, auto-invite the first one
        if (mode === "random" && players.length > 0 && !processedRef.current) {
          processedRef.current = true;
          const target = players[0];
          console.log("Auto-inviting random player:", target.name);
          setInvitingPlayer(target);
          await supabaseService.sendInvitation(target.session_id, {
            profile_id: profileId || "",
            session_id: sid,
            name: username || "Mpilalao",
            avatar: avatar || "default",
            church: churchName,
            city: city,
            points: points,
          });
        }
      } catch (err) {
        console.error("Lobby poll error:", err);
      }
    }, 3000);
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
      });
    } catch (err) {
      setInvitingPlayer(null);
      showAlert({
        title: "Fahadisoana",
        message: "Tsy nahomby ny fandefasana fanasana.",
        buttons: [{ text: "Eny" }]
      });
    }
  };

  const handleAccept = async () => {
    if (!incomingInvite) return;
    setIsJoining(true);
    const sender = incomingInvite;
    setIncomingInvite(null);

    try {
      await supabaseService.acceptInvitation(sender.session_id, {
        profile_id: profileId!,
        session_id: sessionIdRef.current,
        name: username || "Mpilalao",
        avatar: avatar || "default",
        church: churchName,
        city: city,
        points: points,
      });
      // Now both players should have information to start the game
      handleMatchFound(sender, sender.session_id);
    } catch (err) {
      setIsJoining(false);
      showAlert({
        title: "Fahadisoana",
        message: "Tsy nahomby ny fidirana amin'ny lalao.",
        buttons: [{ text: "Eny" }]
      });
    }
  };

  const handleDecline = async () => {
    setIncomingInvite(null);
    await supabaseService.declineInvitation(sessionIdRef.current);
  };

  const handleMatchFound = (selectedOpponent: any, opponentSessionId: string) => {
    if (processedRef.current) return;
    processedRef.current = true;

    setOpponent(selectedOpponent);
    setStatus("found");

    setTimeout(() => {
      const destination = quizType === "image" ? "OnlineImageQuiz" : "OnlineQuiz";
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
        <Text style={styles.playerMeta}>{item.city || "Toerana tsy fantatra"}</Text>
      </View>
      <TouchableOpacity 
        style={styles.inviteBtn}
        onPress={() => handleInvite(item)}
      >
        <Text style={styles.inviteBtnText}>HANASA</Text>
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
                  <Text style={styles.lobbyTitle}>Mpilalao Online</Text>
                  <Text style={styles.lobbySub}>Fididio ny mpilalao tianao hihaika</Text>
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
                  </View>
                )}
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
                  avatar={incomingInvite?.avatar} 
                  size={90} 
                  points={incomingInvite?.points || 0} 
                />
              </View>
              <Text style={styles.modalTitle}>{incomingInvite?.name}</Text>
              <Text style={styles.modalSub}>Manasa anao hiady hevitra amin'ny Baiboly!</Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalBtn, styles.declineBtn]}
                  onPress={handleDecline}
                >
                  <Text style={[styles.btnText, { color: colors.text }]}>HANDA</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalBtn, styles.acceptBtn]}
                  onPress={handleAccept}
                >
                  <Text style={[styles.btnText, { color: colors.background }]}>MANAIKY</Text>
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
              <Text style={styles.modalTitle}>Miandry ny valiny...</Text>
              <Text style={styles.modalSub}>Mandefa fanasana ho an'i {invitingPlayer?.name}</Text>
              
              <TouchableOpacity 
                style={[styles.modalBtn, styles.declineBtn, { width: "100%" }]}
                onPress={() => setInvitingPlayer(null)}
              >
                <Text style={[styles.btnText, { color: colors.text }]}>FOANO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default MatchmakingScreen;
