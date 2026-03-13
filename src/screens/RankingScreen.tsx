import React from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../context/UserContext";
import { Typography, Spacing } from "../theme";

const RankingScreen = () => {
  const { colors, theme } = useUser();
  const isLight = theme === "light";

  const topPlayers = [
    { id: "1", name: "Rasoa", score: 2540, rank: 1, avatar: "account-star" },
    {
      id: "2",
      name: "Rakoto",
      score: 2120,
      rank: 2,
      avatar: "account-star-outline",
    },
    {
      id: "3",
      name: "Naivo",
      score: 1980,
      rank: 3,
      avatar: "account-star-outline",
    },
  ];

  const players = [
    { id: "4", name: "Sahondra", score: 1850, rank: 4 },
    { id: "5", name: "Andry", score: 1720, rank: 5 },
    { id: "6", name: "Lova", score: 1680, rank: 6 },
    { id: "7", name: "Mialy", score: 1540, rank: 7 },
    { id: "8", name: "Tiana", score: 1420, rank: 8 },
    { id: "9", name: "Vola", score: 1390, rank: 9 },
    { id: "10", name: "Naina", score: 1250, rank: 10 },
  ];

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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isLight ? "dark" : "light"} />

      <LinearGradient
        colors={[colors.primary, "#1A237E"]}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { color: colors.white }]}>
          Laharana Globaly
        </Text>

        <View style={styles.topThreeContainer}>
          {topPlayers.map((player) => (
            <View key={player.id} style={styles.topPlayerItem}>
              <View
                style={[
                  styles.avatarContainer,
                  { borderColor: getRankColor(player.rank) },
                ]}
              >
                <MaterialCommunityIcons
                  name={player.avatar as any}
                  size={40}
                  color={getRankColor(player.rank)}
                />
                <View
                  style={[
                    styles.rankBadge,
                    { backgroundColor: getRankColor(player.rank) },
                  ]}
                >
                  <Text style={styles.rankBadgeText}>{player.rank}</Text>
                </View>
              </View>
              <Text style={[styles.topPlayerName, { color: colors.white }]}>
                {player.name}
              </Text>
              <Text
                style={[styles.topPlayerScore, { color: colors.secondary }]}
              >
                {player.score} pts
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.listContent}>
        {players.map((player) => (
          <View
            key={player.id}
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
            <View
              style={[
                styles.smallAvatar,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <MaterialCommunityIcons
                name="account"
                size={20}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.playerName, { color: colors.text }]}>
              {player.name}
            </Text>
            <Text style={[styles.playerScore, { color: colors.accent }]}>
              {player.score} pts
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: Spacing.m,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
  },
  headerTitle: {
    ...Typography.h1,
    fontSize: 24,
    marginBottom: Spacing.l,
  },
  topThreeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "flex-end",
  },
  topPlayerItem: {
    alignItems: "center",
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  rankBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1A237E",
  },
  rankBadgeText: {
    color: "#1A237E",
    fontWeight: "bold",
    fontSize: 12,
  },
  topPlayerName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  topPlayerScore: {
    fontSize: 12,
    fontWeight: "bold",
  },
  listContent: {
    padding: Spacing.m,
  },
  playerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.m,
    paddingHorizontal: Spacing.m,
    borderRadius: 16,
    marginBottom: Spacing.s,
    borderBottomWidth: 1,
  },
  rankText: {
    width: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
  smallAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  playerName: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
  },
  playerScore: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default RankingScreen;
