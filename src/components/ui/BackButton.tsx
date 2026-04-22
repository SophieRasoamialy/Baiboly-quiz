import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface BackButtonProps {
  onPress: () => void;
  colors: any;
  variant?: "default" | "glass" | "outlined";
  style?: ViewStyle | ViewStyle[];
  iconColor?: string;
  size?: number;
}

/**
 * A standardized BackButton component used across the application.
 * Matches the design language found in Bible and Profile screens.
 */
const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  colors,
  variant = "default",
  style,
  iconColor,
  size = 22,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "glass":
        return {
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: 1,
        };
      case "outlined":
        return {
          backgroundColor: "transparent",
          borderColor: colors.border,
          borderWidth: 1,
        };
      default:
        return {
          backgroundColor: colors.surfaceSoft,
          borderColor: colors.border,
          borderWidth: 1,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, getVariantStyle(), style]}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons
        name="arrow-left"
        size={size}
        color={iconColor || (variant === "glass" ? colors.white : colors.text)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackButton;
