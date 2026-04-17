import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface GameOverViewProps {
  playerScore: number;
  opponentScore: number;
  onHomePress: () => void;
  styles: any;
  colors: any;
}

export const GameOverView: React.FC<GameOverViewProps> = ({
  playerScore,
  opponentScore,
  onHomePress,
  styles,
  colors,
}) => {
  const isWinner = playerScore > opponentScore;
  const isDraw = playerScore === opponentScore;

  return (
    <View style={styles.gameOver}>
      <View style={styles.medalCircle}>
        <MaterialCommunityIcons
          name={isWinner ? "trophy" : isDraw ? "handshake" : "emoticon-sad"}
          size={80}
          color={isWinner ? colors.primary : colors.textMuted}
        />
      </View>

      <Text style={styles.resultTitle}>
        {isWinner ? "Baiboly Quiz Pro!" : isDraw ? "Sahala ny lalao!" : "Miezaha foana!"}
      </Text>

      <Text style={styles.resultScores}>
        {playerScore} - {opponentScore}
      </Text>

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={onHomePress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.primary, "#FF8F00"]}
          style={styles.homeGradient}
        >
          <Text style={styles.homeText}>HIVERINA MODY</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
