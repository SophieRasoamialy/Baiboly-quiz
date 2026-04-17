import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  colors: [string, string];
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  onPress: () => void;
}

const VerseActionButton: React.FC<Props> = ({
  styles,
  colors,
  icon,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.actionCircle} onPress={onPress}>
      <LinearGradient colors={colors} style={styles.circleBg}>
        <MaterialCommunityIcons name={icon} size={22} color="#fff" />
      </LinearGradient>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default VerseActionButton;