import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createMultiplayerStyles } from "../../screens/multiplayer/multiplayer.styles";

interface MultiplayerGuestPromptProps {
  onNavigateToAuth: () => void;
}

export const MultiplayerGuestPrompt: React.FC<MultiplayerGuestPromptProps> = ({
  onNavigateToAuth,
}) => {
  const { colors, isLight } = useAppTheme();
  const styles = createMultiplayerStyles(colors);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          isLight
            ? [colors.background, colors.backgroundSecondary]
            : [colors.background, colors.backgroundSecondary, colors.background]
        }
        style={styles.backgroundFill}
      />

      <View style={styles.centerContent}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name="account-group-outline"
            size={64}
            color={colors.primary}
          />
        </View>

        <Text style={styles.title}>Lalao Maromaro</Text>
        <Text style={styles.description}>
          Mila mifandray ianao raha te hilalao amin'ny namana an-tserasera na hifaninana amin'ny mpilalao hafa.
        </Text>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={onNavigateToAuth}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colors.primary, "#FF8F00"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>MIDITRA / HISORATRA ANARANA</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
