import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  styles: any;
  colors: any;
  disabled: boolean;
  onPress: () => void;
}

const AuthSubmitButton: React.FC<Props> = ({
  styles,
  colors,
  disabled,
  onPress,
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
            : [colors.secondary, "#00695C"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.submitButtonInner}
      >
        <Text style={styles.submitButtonText}>Hanomboka</Text>
        <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AuthSubmitButton;