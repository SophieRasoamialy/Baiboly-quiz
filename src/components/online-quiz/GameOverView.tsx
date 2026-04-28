import React, { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import UserAvatar from "../ui/UserAvatar";
import { useUser } from "../../context/user";
import i18n from "../../i18n";

interface GameOverViewProps {
  playerScore: number;
  opponentScore: number;
  sessionPoints?: number;
  username: string;
  userAvatar?: string | null;
  points?: number;
  opponent: any;
  onHomePress: () => void;
  onReplayPress: () => void;
  onAddFriendPress: (opponent: any) => void;
  styles: any;
  colors: any;
}

export const GameOverView: React.FC<GameOverViewProps> = ({
  playerScore,
  opponentScore,
  sessionPoints = 0,
  username,
  userAvatar,
  points = 0,
  opponent,
  onHomePress,
  onReplayPress,
  onAddFriendPress,
  styles,
  colors,
}) => {
  const { friends } = useUser();
  const isAlreadyFriend = friends.some(f => f.id === opponent?.id || (opponent?.profile_id && f.id === opponent.profile_id));
  
  const isWinner = playerScore > opponentScore;
  const isDraw = playerScore === opponentScore;
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scoreScaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(scoreScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.gameOver}>
      <Animated.View style={[styles.resultBanner, { 
        transform: [{ scale: scaleAnim }],
        opacity: fadeAnim 
      }]}>
        <LinearGradient
          colors={isWinner ? [colors.primary, colors.primaryDark] : isDraw ? [colors.secondary, colors.secondaryDark] : [colors.accent, colors.error]}
          style={styles.bannerGradient}
        >
          <View style={styles.winnerAvatarRow}>
            <View style={styles.avatarMiniCircle}>
              <UserAvatar 
                avatar={isWinner ? userAvatar : opponent?.avatar} 
                size={70} 
                points={isWinner ? points : (opponent?.points || 0)} 
              />
            </View>
            <View style={styles.trophyBadge}>
               <MaterialCommunityIcons 
                name={isWinner ? "trophy" : isDraw ? "handshake" : "emoticon-sad"} 
                size={40} 
                color="#FFF" 
              />
            </View>
          </View>
          
          <Text style={[styles.bannerTitle, { color: "#FFF" }]}>
            {isWinner 
              ? i18n.t("player_won", { name: username }) 
              : isDraw 
                ? i18n.t("game_tie") 
                : i18n.t("player_won", { name: opponent.name })}
          </Text>
          <View style={{ backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginTop: 10 }}>
            <Text style={{ color: "#FFF", fontWeight: "900", fontSize: 14 }}>
               {i18n.t("points_gained", { points: sessionPoints >= 0 ? `+${sessionPoints}` : sessionPoints })}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.Text style={[styles.resultScores, { color: colors.primary, transform: [{ scale: scoreScaleAnim }] }]}>
        {playerScore} - {opponentScore}
      </Animated.Text>

      <View style={styles.actionGroup}>
        <TouchableOpacity
          style={[styles.resultActionBtn, { backgroundColor: colors.secondary }]}
          onPress={onReplayPress}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="refresh" size={24} color="#FFF" />
          <Text style={styles.actionText}>{i18n.t("replay")}</Text>
        </TouchableOpacity>

        {!isAlreadyFriend && (
          <TouchableOpacity
            style={[styles.resultActionBtn, { backgroundColor: colors.primary }]}
            onPress={() => onAddFriendPress(opponent)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="account-plus" size={24} color="#FFF" />
            <Text style={styles.actionText}>{i18n.t("add_friend_btn")}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.resultActionBtn, { backgroundColor: colors.surfaceSoft, borderWidth: 1, borderColor: colors.border }]}
          onPress={onHomePress}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="home" size={24} color={colors.text} />
          <Text style={[styles.actionText, { color: colors.text }]}>{i18n.t("go_home")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
