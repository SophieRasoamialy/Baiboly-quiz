import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createTeamQuizStyles } from "../../screens/team-quiz/team-quiz.styles";

interface TeamGameOverProps {
  team1Score: number;
  team2Score: number;
  onHomePress: () => void;
}

export const TeamGameOver: React.FC<TeamGameOverProps> = ({
  team1Score,
  team2Score,
  onHomePress,
}) => {
  const { colors } = useAppTheme();
  const styles = createTeamQuizStyles(colors);

  return (
    <View style={styles.centerPhase}>
      <Text style={styles.gameOverTitle}>Tapitra ny lalao!</Text>

      <View style={styles.finalScoreGrid}>
        <View style={styles.finalScoreCard}>
          <Text style={styles.teamName}>EKIPA 1</Text>
          <Text style={[styles.finalPoints, { color: colors.secondary }]}>{team1Score}</Text>
        </View>

        <View style={styles.finalScoreCard}>
          <Text style={styles.teamName}>EKIPA 2</Text>
          <Text style={[styles.finalPoints, { color: colors.primary }]}>{team2Score}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionBtn} onPress={onHomePress}>
        <LinearGradient colors={[colors.primary, "#FF8F00"]} style={styles.btnGradient}>
          <Text style={styles.btnText}>HIVERINA MODY</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
