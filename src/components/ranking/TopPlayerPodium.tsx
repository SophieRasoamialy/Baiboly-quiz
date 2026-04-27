import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../screens/ranking/ranking.styles";
import UserAvatar from "../ui/UserAvatar";

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
  const isFirst = player.rank === 1;

  return (
    <View style={[styles.topPlayerItem, { paddingBottom: isFirst ? 20 : 0 }]}>
      {isFirst && (
        <MaterialCommunityIcons 
          name="crown" 
          size={24} 
          color="#FFD700" 
          style={{ marginBottom: -8, zIndex: 10 }} 
        />
      )}
      
      <View style={styles.podiumAvatarWrap}>
        <UserAvatar 
          avatar={player.avatar} 
          size={isFirst ? 82 : 64} 
          points={player.score}
        />
        <View style={[styles.rankBadge, { backgroundColor: rankColor, borderColor: colors.background }]}>
          <Text style={[styles.rankBadgeText, { color: colors.background }]}>{player.rank}</Text>
        </View>
        
        <View style={[styles.podiumTier, { backgroundColor: rankColor + "30" }]}>
          <Text style={[styles.podiumTierText, { color: rankColor }]}>
            {player.rank === 1 ? "VOALOHANY" : player.rank === 2 ? "FAHAROA" : "FAHATELO"}
          </Text>
        </View>
      </View>

      <Text style={[styles.topPlayerName, { color: colors.white, marginTop: 15 }]}>
        {player.name}
      </Text>
      <Text style={[styles.topPlayerScore, { color: colors.secondary }]}>
        {player.score.toLocaleString()} pts
      </Text>
    </View>
  );
};
