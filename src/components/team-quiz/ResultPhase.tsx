import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createTeamQuizStyles } from "../../screens/team-quiz/team-quiz.styles";

export const ResultPhase: React.FC<{ guess: string; currentWord: any }> = ({
  guess,
  currentWord,
}) => {
  const { colors } = useAppTheme();
  const styles = createTeamQuizStyles(colors);
  
  const isCorrect = guess.trim().toLowerCase() === currentWord?.word.toLowerCase();

  return (
    <View style={styles.centerPhase}>
      <MaterialCommunityIcons
        name={isCorrect ? "check-decagram" : "close-circle"}
        size={100}
        color={isCorrect ? colors.secondary : colors.accent}
      />
      
      <View style={styles.resultWordContainer}>
        <Text style={styles.resultWord}>{currentWord?.word}</Text>
        <Text style={styles.resultStatus}>
          {isCorrect ? "BRAVO! Marina ny valiny." : "Oadray! Tsy marina ny valiny."}
        </Text>
      </View>
    </View>
  );
};
