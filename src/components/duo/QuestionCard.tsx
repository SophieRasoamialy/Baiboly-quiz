import React from "react";
import { View, Text } from "react-native";

interface QuestionCardProps {
  question: string;
  index: number;
  styles: any;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  styles,
}) => {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.counter}>FANONTANIANA {index + 1}</Text>
      <Text style={styles.question}>{question}</Text>
    </View>
  );
};