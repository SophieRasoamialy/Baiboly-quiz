import React from "react";
import { Image, Text, View } from "react-native";
import { AVATAR_MAP } from "../../constants/avatar";

interface ScoreBoardProps {
  playerScore: number;
  opponentScore: number;
  username: string | null;
  userAvatar: string | null;
  opponent: any;
  timeLeft: number;
  styles: any;
  colors: any;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  playerScore,
  opponentScore,
  username,
  userAvatar,
  opponent,
  timeLeft,
  styles,
  colors,
}) => {
  return (
    <View style={styles.scoreBoard}>
      {/* Player */}
      <View style={styles.playerInfo}>
        <Text style={styles.nameText}>{username || "Hianao"}</Text>
        <View style={styles.avatarMini}>
          <Image
            source={AVATAR_MAP[userAvatar as keyof typeof AVATAR_MAP] || AVATAR_MAP.david}
            style={styles.avatarImg}
          />
        </View>
        <View style={styles.scorePill}>
          <Text style={styles.scoreText}>{playerScore}</Text>
        </View>
      </View>

      {/* Timer */}
      <View style={styles.timerCenter}>
        <View style={[styles.timerCircle, timeLeft <= 5 && { borderColor: colors.accent }]}>
          <Text style={[styles.timerText, timeLeft <= 5 && { color: colors.accent }]}>
            {timeLeft}
          </Text>
        </View>
      </View>

      {/* Opponent */}
      <View style={styles.playerInfo}>
        <Text style={styles.nameText}>{opponent?.name || "Mpilalao"}</Text>
        <View style={styles.avatarMini}>
          <Image
            source={AVATAR_MAP[opponent?.avatar as keyof typeof AVATAR_MAP] || AVATAR_MAP.elder}
            style={styles.avatarImg}
          />
        </View>
        <View style={styles.scorePill}>
          <Text style={styles.scoreText}>{opponentScore}</Text>
        </View>
      </View>
    </View>
  );
};
