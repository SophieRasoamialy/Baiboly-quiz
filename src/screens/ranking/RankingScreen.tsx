import React from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../../context/user/UserContext";
import { styles } from "./ranking.styles";
import { MOCK_TOP_PLAYERS, MOCK_PLAYERS } from "../../constants/ranking";
import { TopPlayerPodium } from "../../components/ranking/TopPlayerPodium";
import { PlayerListItem } from "../../components/ranking/PlayerListItem";

const RankingScreen = () => {
  const { colors, theme } = useUser();
  const isLight = theme === "light";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isLight ? "dark" : "light"} />

      <LinearGradient colors={[colors.primary, "#1A237E"]} style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.white }]}>
          Laharana Globaly
        </Text>

        <View style={styles.topThreeContainer}>
          {MOCK_TOP_PLAYERS.map((player) => (
            <TopPlayerPodium key={player.id} player={player} colors={colors} />
          ))}
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.listContent}>
        {MOCK_PLAYERS.map((player) => (
          <PlayerListItem key={player.id} player={player} colors={colors} />
        ))}
      </ScrollView>
    </View>
  );
};

export default RankingScreen;
