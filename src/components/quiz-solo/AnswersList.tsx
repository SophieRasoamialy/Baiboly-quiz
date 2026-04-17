import React from "react";
import { View } from "react-native";
import AnswerButton from "./AnswerButton";

interface Props {
  answers: string[];
  onSelect: (answer: string) => void;
  selectedAnswer: string | null;
  correctAnswer: string | null;
  disabled: boolean;
  styles: any;
  colors: any;
}

const AnswersList: React.FC<Props> = ({ 
  answers, 
  onSelect, 
  selectedAnswer, 
  correctAnswer, 
  disabled,
  styles,
  colors
}) => {
  const getStatus = (answer: string) => {
    if (!selectedAnswer) return "default";
    if (answer === correctAnswer) return "correct";
    if (answer === selectedAnswer && answer !== correctAnswer) return "wrong";
    return "default";
  };

  return (
    <View>
      {answers.map((a: string, index: number) => (
        <AnswerButton
          key={index}
          text={a}
          onPress={() => onSelect(a)}
          disabled={disabled}
          status={getStatus(a)}
          index={index}
          styles={styles}
          colors={colors}
        />
      ))}
    </View>
  );
};

export default AnswersList;