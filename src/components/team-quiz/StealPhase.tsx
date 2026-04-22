import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createTeamQuizStyles } from "../../screens/team-quiz/team-quiz.styles";

interface StealPhaseProps {
  guess: string;
  setGuess: (val: string) => void;
  onSubmitGuess: () => void;
}

export const StealPhase: React.FC<StealPhaseProps> = ({
  guess,
  setGuess,
  onSubmitGuess,
}) => {
  const { colors } = useAppTheme();
  const styles = createTeamQuizStyles(colors);

  return (
    <View style={styles.centerPhase}>
      <Text style={styles.stealTitle}>MANGALATRA ISA!</Text>
      <Text style={styles.stealSub}>Anjaran'ny ekipa mpifanandrina izao.</Text>

      <TextInput
        style={[styles.mainGuessInput, { borderColor: colors.accent }]}
        value={guess}
        onChangeText={setGuess}
        placeholder="Soraty eto..."
        placeholderTextColor={colors.textMuted}
        autoFocus
      />

      <TouchableOpacity style={styles.actionBtn} onPress={onSubmitGuess}>
        <LinearGradient colors={[colors.accent, "#D32F2F"]} style={styles.btnGradient}>
          <Text style={styles.btnText}>MANGALATRA ISA</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
