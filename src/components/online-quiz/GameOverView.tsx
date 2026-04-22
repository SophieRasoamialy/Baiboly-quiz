import React, { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View, Animated, Easing, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AVATAR_MAP } from "../../constants/avatar";

interface GameOverViewProps {
  playerScore: number;
  opponentScore: number;
  username: string;
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
  username,
  opponent,
  onHomePress,
  onReplayPress,
  onAddFriendPress,
  styles,
  colors,
}) => {
  const isWinner = playerScore > opponentScore;
  const isDraw = playerScore === opponentScore;
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
    ]).start();
  }, []);

  return (
    <View style={styles.gameOver}>
      <Animated.View style={[styles.resultBanner, { 
        transform: [{ scale: scaleAnim }],
        opacity: fadeAnim 
      }]}>
        <LinearGradient
          colors={isWinner ? [colors.primary, "#FF8F00"] : [colors.surfaceSoft, colors.border]}
          style={styles.bannerGradient}
        >
          <View style={styles.winnerAvatarRow}>
            <View style={styles.avatarMiniCircle}>
               <Image 
                source={AVATAR_MAP[opponent.avatar as keyof typeof AVATAR_MAP] || AVATAR_MAP.david} 
                style={styles.avatarImg} 
              />
            </View>
            <MaterialCommunityIcons 
              name={isWinner ? "crown" : isDraw ? "handshake" : "emoticon-sad"} 
              size={40} 
              color={isWinner ? "#FFF" : colors.textMuted} 
            />
          </View>
          
          <Text style={[styles.bannerTitle, { color: isWinner ? "#FFF" : colors.text }]}>
            {isWinner ? `${username} MANDRESY!` : isDraw ? "SAHALA NY LALAO!" : `${opponent.name} MANDRESY!`}
          </Text>
        </LinearGradient>
      </Animated.View>

      <Text style={styles.resultScores}>
        {playerScore} - {opponentScore}
      </Text>

      <View style={styles.actionGroup}>
        <TouchableOpacity
          style={[styles.resultActionBtn, { backgroundColor: colors.primary }]}
          onPress={onReplayPress}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="refresh" size={24} color="#FFF" />
          <Text style={styles.actionText}>HILALAO INDRAY</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.resultActionBtn, { backgroundColor: colors.secondary }]}
          onPress={() => onAddFriendPress(opponent)}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="account-plus" size={24} color="#FFF" />
          <Text style={styles.actionText}>HANAMPY NAMANA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.resultActionBtn, { backgroundColor: colors.surfaceSoft, borderWidth: 1, borderColor: colors.border }]}
          onPress={onHomePress}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="home" size={24} color={colors.text} />
          <Text style={[styles.actionText, { color: colors.text }]}>HIVERINA MODY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
