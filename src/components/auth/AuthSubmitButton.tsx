import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  styles: any;
  colors: any;
  disabled: boolean;
  onPress: () => void;
  label?: string;
}

const AuthSubmitButton: React.FC<Props> = ({
  styles,
  colors,
  disabled,
  onPress,
  label = "Hanomboka",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.submitButton,
        { opacity: disabled ? 0.5 : 1 },
      ]}
    >
      <LinearGradient
        colors={
          disabled
            ? ["rgba(255,255,255,0.10)", "rgba(255,255,255,0.10)"]
            : [colors.primary, "#065F46"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.submitButtonInner}
      >
        <Text style={styles.submitButtonText}>{label}</Text>
        <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AuthSubmitButton;