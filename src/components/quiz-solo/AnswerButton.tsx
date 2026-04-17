import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  text: string;
  onPress: () => void;
  disabled: boolean;
  status: "correct" | "wrong" | "default";
  index: number;
  styles: any;
  colors: any;
}

const AnswerButton: React.FC<Props> = ({ text, onPress, disabled, status, index, styles, colors }) => {
  const labels = ["A", "B", "C", "D"];
  
  let rootStyle = [styles.answerBtn];
  if (status === "correct") rootStyle.push(styles.answerBtnCorrect);
  if (status === "wrong") rootStyle.push(styles.answerBtnWrong);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={rootStyle}
    >
      <View style={styles.answerLabel}>
        <Text style={styles.answerLabelText}>{labels[index]}</Text>
      </View>
      <Text style={[styles.answerText, status === "correct" && { color: colors.secondaryDark }]}>
        {text}
      </Text>
      {status === "correct" && (
        <MaterialCommunityIcons name="check-circle" size={24} color={colors.secondary} />
      )}
      {status === "wrong" && (
        <MaterialCommunityIcons name="close-circle" size={24} color={colors.accent} />
      )}
    </TouchableOpacity>
  );
};

export default AnswerButton;