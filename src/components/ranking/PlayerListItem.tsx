import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../screens/ranking/ranking.styles";

interface PlayerListItemProps {
  player: { id: string; name: string; score: number; rank: number };
  colors: any;
}

export const PlayerListItem: React.FC<PlayerListItemProps> = ({ player, colors }) => {
  return (
    <View
      style={[
        styles.playerItem,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.rankText, { color: colors.textSecondary }]}>
        {player.rank}
      </Text>
      <View style={[styles.smallAvatar, { backgroundColor: colors.primary + "20" }]}>
        <MaterialCommunityIcons name="account" size={20} color={colors.primary} />
      </View>
      <Text style={[styles.playerName, { color: colors.text }]}>{player.name}</Text>
      <Text style={[styles.playerScore, { color: colors.accent }]}>
        {player.score} pts
      </Text>
    </View>
  );
};
