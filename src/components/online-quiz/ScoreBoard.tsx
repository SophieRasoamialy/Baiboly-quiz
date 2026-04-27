import React from "react";
import { Text, View } from "react-native";
import UserAvatar from "../ui/UserAvatar";

interface ScoreBoardProps {
  playerScore: number;
  opponentScore: number;
  username: string | null;
  userAvatar: string | null;
  totalPoints: number;
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
  totalPoints,
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
          <UserAvatar 
            avatar={userAvatar} 
            size={40} 
            points={totalPoints}
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
          <UserAvatar 
            avatar={opponent?.avatar} 
            size={40} 
            points={opponent?.points || 0} 
          />
        </View>
        <View style={styles.scorePill}>
          <Text style={styles.scoreText}>{opponentScore}</Text>
        </View>
      </View>
    </View>
  );
};
