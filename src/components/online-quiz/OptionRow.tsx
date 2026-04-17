import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface OptionRowProps {
  option: string;
  index: number;
  isCorrect: boolean;
  isSelected: boolean;
  isOpponentSelected: boolean;
  showResult: boolean;
  selectedAnswer: number | null;
  opponentName: string;
  onSelect: (index: number) => void;
  styles: any;
  colors: any;
}

export const OptionRow: React.FC<OptionRowProps> = ({
  option,
  index,
  isCorrect,
  isSelected,
  isOpponentSelected,
  showResult,
  selectedAnswer,
  opponentName,
  onSelect,
  styles,
  colors,
}) => {
  let btnStyle = [styles.optionBtn];
  if (isSelected) btnStyle.push(styles.optionBtnSelected);
  
  if (showResult) {
    if (isCorrect) btnStyle.push(styles.optionBtnCorrect);
    else if (isSelected) btnStyle.push(styles.optionBtnWrong);
  }

  return (
    <TouchableOpacity
      style={btnStyle}
      onPress={() => onSelect(index)}
      disabled={selectedAnswer !== null || showResult}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.optionText,
        showResult && isCorrect && { color: colors.secondaryDark }
      ]}>
        {option}
      </Text>

      <View style={styles.indicators}>
        {isSelected && (
          <View style={styles.playerTag}>
            <Text style={styles.tagText}>IAO</Text>
          </View>
        )}
        {isOpponentSelected && (
          <View style={styles.opponentTag}>
            <Text style={styles.tagText}>{opponentName.split(" ")[0].toUpperCase()}</Text>
          </View>
        )}
        {showResult && isCorrect && (
          <MaterialCommunityIcons name="check-circle" size={20} color={colors.secondary} />
        )}
      </View>
    </TouchableOpacity>
  );
};
