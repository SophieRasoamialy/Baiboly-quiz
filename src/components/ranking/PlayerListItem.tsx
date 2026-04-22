import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../screens/ranking/ranking.styles";
import UserAvatar from "../ui/UserAvatar";

interface PlayerListItemProps {
  player: { id: string; name: string; score: number; rank: number; avatar: string };
  colors: any;
}

export const PlayerListItem: React.FC<PlayerListItemProps> = ({ player, colors }) => {
  return (
    <View
      style={[
        styles.playerItem,
        {
          backgroundColor: colors.surface + "C0", // Slight transparency
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
      />

      <Text style={[styles.playerName, { color: colors.text }]} numberOfLines={1}>
        {player.name}
      </Text>
      
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={[styles.playerScore, { color: colors.primary }]}>
          {player.score.toLocaleString()}
        </Text>
        <Text style={{ fontSize: 10, color: colors.textMuted, fontWeight: 'bold' }}>ISA</Text>
      </View>
    </View>
  );
};
