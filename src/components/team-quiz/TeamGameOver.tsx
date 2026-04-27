import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

  const winner = team1Score > team2Score ? 1 : team2Score > team1Score ? 2 : 0;
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.centerPhase, { transform: [{ scale: scaleAnim }] }]}>
      <MaterialCommunityIcons 
        name="trophy" 
        size={80} 
        color={winner === 1 ? colors.secondary : winner === 2 ? colors.primary : colors.textMuted} 
        style={{ marginBottom: 20 }}
      />
      
      <Text style={[styles.gameOverTitle, { color: colors.text }]}>
        {winner === 0 ? "SAHALA NY EKIPA!" : `EKIPA ${winner} MANDRESY!`}
      </Text>
      <Text style={{ color: colors.textMuted, marginBottom: 30, fontSize: 16 }}>
        Tena nahafinaritra ny lalao!
      </Text>

      <View style={styles.finalScoreGrid}>
        <View style={[styles.finalScoreCard, { backgroundColor: colors.card }, winner === 1 && { borderColor: colors.secondary, borderWidth: 2 }]}>
          <Text style={[styles.teamName, { color: colors.textMuted }]}>EKIPA 1</Text>
          <Text style={[styles.finalPoints, { color: colors.secondary }]}>{team1Score}</Text>
        </View>

        <View style={[styles.finalScoreCard, { backgroundColor: colors.card }, winner === 2 && { borderColor: colors.primary, borderWidth: 2 }]}>
          <Text style={[styles.teamName, { color: colors.textMuted }]}>EKIPA 2</Text>
          <Text style={[styles.finalPoints, { color: colors.primary }]}>{team2Score}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionBtn} onPress={onHomePress}>
        <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.btnGradient}>
          <MaterialCommunityIcons name="home" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.btnText}>HIVERINA MODY</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};
