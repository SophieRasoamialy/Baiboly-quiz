import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createMultiplayerStyles } from "../../screens/multiplayer/multiplayer.styles";
import i18n from "../../i18n";

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

        <Text style={styles.title}>{i18n.t("multiplayer_title")}</Text>
        <Text style={styles.description}>
          {i18n.t("multiplayer_online_msg")}
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
            <Text style={styles.buttonText}>{i18n.t("multi_guest_btn")}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
