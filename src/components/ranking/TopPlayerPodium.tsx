import React from "react";
import { View, Text, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../screens/ranking/ranking.styles";
import UserAvatar from "../ui/UserAvatar";
import i18n from "../../i18n";

const { width } = Dimensions.get("window");

interface TopPlayerPodiumProps {
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

  const rankLabel = () => {
    if (player.rank === 1) return i18n.t("rank_1");
    if (player.rank === 2) return i18n.t("rank_2");
    return i18n.t("rank_3");
  };

  return (
    <View style={[styles.topPlayerItem, { paddingBottom: isFirst ? 8 : 0 }]}>
      {isFirst && (
        <MaterialCommunityIcons
          name="crown"
          size={24}
          color="#FFD700"
          style={{ marginBottom: 4, zIndex: 10 }}
        />
      )}

      {/* Avatar ring — no longer contains an absolute-positioned badge */}
      <View style={styles.podiumAvatarWrap}>
        <UserAvatar
          avatar={player.avatar}
          size={isFirst ? 82 : 64}
          points={player.score}
        />
        <View
          style={[
            styles.rankBadge,
            { backgroundColor: rankColor, borderColor: colors.background },
          ]}
        >
          <Text style={[styles.rankBadgeText, { color: colors.background }]}>
            {player.rank}
          </Text>
        </View>
      </View>

      {/* Rank pill — now in normal document flow, always fits the text */}
      <View
        style={[
          styles.podiumTier,
          { backgroundColor: rankColor + "28", borderColor: rankColor + "60" },
        ]}
      >
        <Text style={[styles.podiumTierText, { color: rankColor }]}>
          {rankLabel()}
        </Text>
      </View>

      <View style={{ width: width / 3.5, alignItems: 'center', marginTop: 8 }}>
        <Text
          style={[styles.topPlayerName, { color: colors.white }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {player.name}
        </Text>

        {player.church && (
          <Text 
            style={[styles.podiumSubInfo, { color: colors.white, opacity: 0.8 }]} 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {player.church}
          </Text>
        )}

        {player.city && (
          <Text 
            style={[styles.podiumSubInfo, { color: colors.white, opacity: 0.6 }]} 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {player.city}
          </Text>
        )}

        <Text style={[styles.topPlayerScore, { color: colors.secondary, marginTop: 4 }]}>
          {player.score.toLocaleString()} {i18n.t("points_unit").toLowerCase()}
        </Text>
      </View>
    </View>
  );
};
