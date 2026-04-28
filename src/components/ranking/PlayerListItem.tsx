import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../screens/ranking/ranking.styles";
import UserAvatar from "../ui/UserAvatar";
import i18n from "../../i18n";

interface PlayerListItemProps {
  player: {
    id: string;
    name: string;
    score: number;
    rank: number;
    avatar: string;
    church?: string | null;
    city?: string | null;
  };
  colors: any;
}

export const PlayerListItem: React.FC<PlayerListItemProps> = ({ player, colors }) => {
  const subInfo = [player.church, player.city].filter(Boolean).join(" · ");

  return (
    <View
      style={[
        styles.playerItem,
        {
          backgroundColor: colors.surface + "C0",
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.rankText, { color: colors.textSecondary }]}>
        {player.rank.toString().padStart(2, "0")}
      </Text>

      <UserAvatar
        avatar={player.avatar}
        size={40}
        borderWidth={2}
        points={player.score}
      />

      {/* Name + church/city column */}
      <View style={styles.playerNameCol}>
        <Text
          style={[styles.playerName, { color: colors.text }]}
          numberOfLines={1}
        >
          {player.name}
        </Text>
        {!!subInfo && (
          <Text
            style={[styles.playerSubInfo, { color: colors.textMuted }]}
            numberOfLines={1}
          >
            {subInfo}
          </Text>
        )}
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={[styles.playerScore, { color: colors.primary }]}>
          {player.score.toLocaleString()}
        </Text>
        <Text
          style={{ fontSize: 10, color: colors.textMuted, fontWeight: "bold" }}
        >
          {i18n.t("points_unit")}
        </Text>
      </View>
    </View>
  );
};
