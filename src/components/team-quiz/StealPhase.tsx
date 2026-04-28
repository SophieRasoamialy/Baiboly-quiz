import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createTeamQuizStyles } from "../../screens/team-quiz/team-quiz.styles";
import i18n from "../../i18n";

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
      <Text style={styles.stealTitle}>{i18n.t("steal_point_title")}</Text>
      <Text style={styles.stealSub}>{i18n.t("opponent_turn_msg")}</Text>

      <TextInput
        style={[styles.mainGuessInput, { borderColor: colors.accent }]}
        value={guess}
        onChangeText={setGuess}
        placeholder={i18n.t("write_here")}
        placeholderTextColor={colors.textMuted}
        autoFocus
      />

      <TouchableOpacity style={styles.actionBtn} onPress={onSubmitGuess}>
        <LinearGradient colors={[colors.accent, "#D32F2F"]} style={styles.btnGradient}>
          <Text style={styles.btnText}>{i18n.t("steal_point_btn")}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
