import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  styles: any;
  colors: any;
  disabled: boolean;
  loading?: boolean;
  onPress: () => void;
  label?: string;
}

function AuthSubmitButton({
  styles,
  colors,
  disabled,
  loading = false,
  onPress,
  label = "Hanomboka",
}: Props) {
  const isVisuallyDisabled = disabled && !loading;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.submitButton,
        { opacity: isVisuallyDisabled ? 0.5 : 1 },
      ]}
    >
      <LinearGradient
        colors={
          isVisuallyDisabled
            ? ["rgba(255,255,255,0.10)", "rgba(255,255,255,0.10)"]
            : [colors.primary, "#065F46"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.submitButtonInner}
      >
        <Text style={styles.submitButtonText}>{label}</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#0D0B15" />
        ) : (
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AuthSubmitButton;
