import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Typography, Spacing } from "../theme";
import { useUser } from "../context/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { gems, medals, avatar, colors } = useUser();

  const allMedals = [
    { id: "bronze", name: "Alimo", color: "#CD7F32" },
    { id: "silver", name: "Volafotsy", color: "#C0C0C0" },
    { id: "gold", name: "Volamena", color: "#FFD700" },
    { id: "platinum", name: "Platina", color: "#E5E4E2" },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons
              name="account-circle"
              size={100}
              color={colors.accent}
            />
            <TouchableOpacity
              style={[
                styles.editAvatar,
                {
                  backgroundColor: colors.accent,
                  borderColor: colors.background,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="pencil"
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>
            Mpihira Malagasy
          </Text>
          <Text style={[styles.userLevel, { color: colors.accent }]}>
            Ambaratonga 5
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View
            style={[
              styles.statBox,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Vato soa
            </Text>
            <View style={styles.statValueContainer}>
              <MaterialCommunityIcons
                name="diamond-stone"
                size={24}
                color={colors.accent}
              />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {gems}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.statBox,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Isa feno
            </Text>
            <View style={styles.statValueContainer}>
              <MaterialCommunityIcons
                name="trophy"
                size={24}
                color={colors.secondary}
              />
              <Text style={[styles.statValue, { color: colors.text }]}>
                1,240
              </Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.secondary }]}>
          Meday azonao
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.medalsContainer}
        >
          {allMedals.map((m) => {
            const hasMedal = medals.includes(m.id);
            return (
              <View
                key={m.id}
                style={[
                  styles.medalCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                  !hasMedal && styles.medalLocked,
                ]}
              >
                <MaterialCommunityIcons
                  name={hasMedal ? "medal" : "lock"}
                  size={40}
                  color={hasMedal ? m.color : colors.border}
                />
                <Text
                  style={[
                    styles.medalName,
                    { color: hasMedal ? colors.text : colors.textSecondary },
                    !hasMedal && { color: colors.border },
                  ]}
                >
                  {m.name}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: colors.secondary }]}>
          Laharana ankapobeny
        </Text>
        <View
          style={[
            styles.rankingContainer,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {[1, 2, 3].map((r) => (
            <View
              key={r}
              style={[
                styles.rankItem,
                { borderBottomColor: colors.border },
                r === 1 && { backgroundColor: colors.secondary + "10" },
              ]}
            >
              <Text style={[styles.rankNum, { color: colors.secondary }]}>
                {r}
              </Text>
              <Text style={[styles.rankName, { color: colors.text }]}>
                Mpilalao {r}
              </Text>
              <Text style={[styles.rankScore, { color: colors.accent }]}>
                {1500 - r * 100} pts
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.m,
  },
  profileHeader: {
    alignItems: "center",
    marginVertical: Spacing.xl,
  },
  avatarContainer: {
    position: "relative",
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
  },
  userName: {
    ...Typography.h1,
    marginTop: Spacing.m,
  },
  userLevel: {
    ...Typography.caption,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },
  statBox: {
    width: "48%",
    padding: Spacing.m,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  statLabel: {
    ...Typography.caption,
    marginBottom: 4,
  },
  statValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statValue: {
    ...Typography.h2,
    marginLeft: 6,
  },
  sectionTitle: {
    ...Typography.h2,
    marginBottom: Spacing.m,
  },
  medalsContainer: {
    paddingBottom: Spacing.l,
  },
  medalCard: {
    width: 100,
    height: 120,
    marginRight: Spacing.m,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  medalLocked: {
    opacity: 0.5,
  },
  medalName: {
    ...Typography.caption,
    marginTop: 8,
    fontWeight: "bold",
  },
  rankingContainer: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  rankItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.m,
    borderBottomWidth: 1,
  },
  rankNum: {
    ...Typography.h2,
    width: 30,
  },
  rankName: {
    ...Typography.body,
    flex: 1,
  },
  rankScore: {
    ...Typography.body,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
