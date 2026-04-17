import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../screens/ranking/ranking.styles";

interface TopPlayerPodiumProps {
  player: {
    id: string;
    name: string;
    score: number;
    rank: number;
    avatar: string;
  };
  colors: any;
}

export const TopPlayerPodium: React.FC<TopPlayerPodiumProps> = ({ player, colors }) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "#FFD700";
      case 2:
        return "#C0C0C0";
      case 3:
        return "#CD7F32";
      default:
        return colors.textSecondary;
    }
  };

  const rankColor = getRankColor(player.rank);

  return (
    <View style={styles.topPlayerItem}>
      <View style={[styles.avatarContainer, { borderColor: rankColor }]}>
        <MaterialCommunityIcons
          name={player.avatar as any}
          size={40}
          color={rankColor}
        />
        <View style={[styles.rankBadge, { backgroundColor: rankColor }]}>
          <Text style={styles.rankBadgeText}>{player.rank}</Text>
        </View>
      </View>
      <Text style={[styles.topPlayerName, { color: colors.white }]}>
        {player.name}
      </Text>
      <Text style={[styles.topPlayerScore, { color: colors.secondary }]}>
        {player.score} pts
      </Text>
    </View>
  );
};
