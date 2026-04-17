import React from "react";
import { View, Text } from "react-native";

interface QuestionCardProps {
  questionIndex: number;
  totalQuestions: number;
  questionText: string;
  styles: any;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionIndex,
  totalQuestions,
  questionText,
  styles,
}) => {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.questionCounter}>
        FANONTANIANA {questionIndex + 1} / {totalQuestions}
      </Text>
      <Text style={styles.questionText}>
        {questionText}
      </Text>
    </View>
  );
};
