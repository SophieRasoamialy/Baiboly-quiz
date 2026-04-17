import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface OptionButtonProps {
  option: string;
  index: number;
  revealed: boolean;
  isAnswer: boolean;
  isSelected: boolean;
  disabled: boolean;
  onPress: () => void;
  styles: any;
  colors: any;
}

const OPTION_LETTERS = ["A", "B", "C", "D"];

export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  index,
  revealed,
  isAnswer,
  isSelected,
  disabled,
  onPress,
  styles,
  colors,
}) => {
  let btnStyle = [styles.optionBtn];
  let textStyle = [styles.optionText];
  let letterContainerStyle = [styles.optionLetter];
  let letterTextStyle = [styles.optionLetterText];

  if (isSelected) {
    btnStyle.push(styles.optionBtnSelected);
    letterContainerStyle.push({ backgroundColor: colors.primary, borderColor: colors.primary });
    letterTextStyle.push({ color: "#fff" });
  }

  if (revealed) {
    if (isAnswer) {
      btnStyle.push(styles.optionBtnCorrect);
      letterContainerStyle.push({ backgroundColor: colors.secondary, borderColor: colors.secondary });
      letterTextStyle.push({ color: "#fff" });
    } else if (isSelected) {
      btnStyle.push(styles.optionBtnWrong);
      letterContainerStyle.push({ backgroundColor: colors.accent, borderColor: colors.accent });
      letterTextStyle.push({ color: "#fff" });
    }
  }

  return (
    <TouchableOpacity
      style={btnStyle}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={letterContainerStyle}>
        <Text style={letterTextStyle}>{OPTION_LETTERS[index]}</Text>
      </View>
      <Text style={textStyle}>{option}</Text>
      {revealed && isAnswer && (
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color={colors.secondary}
        />
      )}
      {revealed && isSelected && !isAnswer && (
        <MaterialCommunityIcons
          name="close-circle"
          size={20}
          color={colors.accent}
        />
      )}
    </TouchableOpacity>
  );
};
