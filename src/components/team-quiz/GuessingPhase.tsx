import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createTeamQuizStyles } from "../../screens/team-quiz/team-quiz.styles";
import i18n from "../../i18n";

interface GuessingPhaseProps {
  timeLeft: number;
  threeWords: string[];
  guess: string;
  setGuess: (val: string) => void;
  onSubmitGuess: () => void;
}

export const GuessingPhase: React.FC<GuessingPhaseProps> = ({
  timeLeft,
  threeWords,
  guess,
  setGuess,
  onSubmitGuess,
}) => {
  const { colors } = useAppTheme();
  const styles = createTeamQuizStyles(colors);

  return (
    <View style={styles.centerPhase}>
      <View style={[styles.timerBar, timeLeft <= 5 && { borderColor: colors.accent }]}>
        <Text style={[styles.timerText, timeLeft <= 5 && { color: colors.accent }]}>
          {timeLeft}
        </Text>
      </View>

      <View style={styles.clueRow}>
        {threeWords.map((w, i) => (
          <View key={i} style={styles.clueCard}>
            <Text style={styles.clueText}>{w.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.guessHint}>{i18n.t("guess_prompt")}</Text>
      
      <TextInput
        style={styles.mainGuessInput}
        value={guess}
        onChangeText={setGuess}
        placeholder={i18n.t("write_here")}
        placeholderTextColor={colors.textMuted}
        autoFocus
      />

      <TouchableOpacity style={styles.actionBtn} onPress={onSubmitGuess}>
        <LinearGradient colors={[colors.secondary, "#B45309"]} style={styles.btnGradient}>
          <Text style={styles.btnText}>{i18n.t("verify")}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
