import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createMatchmakingStyles } from "../../screens/matchmaking/matchmaking.styles";
import UserAvatar from "../ui/UserAvatar";
import i18n from "../../i18n";

interface MatchFoundCardProps {
  opponent: any;
}

export const MatchFoundCard: React.FC<MatchFoundCardProps> = ({ opponent }) => {
  const { colors } = useAppTheme();
  const styles = createMatchmakingStyles(colors);

  return (
    <View style={styles.matchCard}>
      <Text style={styles.foundText}>{i18n.t("match_found_title")}</Text>

      <View style={styles.opponentAvatarCircle}>
        <UserAvatar 
          avatar={opponent?.avatar} 
          size={110} 
          points={opponent?.points || 0} 
        />
      </View>

      <Text style={styles.opponentName}>{opponent?.name}</Text>

      <View style={styles.opponentDetails}>
        <View style={styles.badge}>
          <MaterialCommunityIcons name="church" size={16} color={colors.secondary} />
          <Text style={styles.badgeText}>{opponent?.church || i18n.t("not_specified")}</Text>
        </View>
        
        <View style={styles.badge}>
          <MaterialCommunityIcons name="map-marker" size={16} color={colors.secondary} />
          <Text style={styles.badgeText}>{opponent?.city || i18n.t("not_specified")}</Text>
        </View>
      </View>

      <View style={[styles.badge, styles.startBadge, { backgroundColor: colors.surfaceSoft, borderWidth: 1, borderColor: colors.border }]}>
        <Text style={styles.startText}>{i18n.t("game_starting")}</Text>
      </View>
    </View>
  );
};
