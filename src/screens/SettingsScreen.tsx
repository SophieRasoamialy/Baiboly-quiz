import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Typography, Spacing } from "../theme";
import { useUser } from "../context/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../i18n";

const SettingsScreen = () => {
  const {
    language,
    setLanguage,
    gems,
    hearts,
    theme,
    toggleTheme,
    addHeart,
    removeGems,
    colors,
  } = useUser();

  const handleBuyHeart = () => {
    if (hearts >= 5) {
      Alert.alert("Efa feno", "Efa manana fo 5 ianao (ny fara-tampony).");
      return;
    }
    if (gems >= 50) {
      removeGems(50);
      addHeart();
      Alert.alert("Fombafomba", "Nahazo fo 1 ianao!");
    } else {
      Alert.alert(
        "Tsy ampy ny vato soa",
        "Mila vato soa 50 ianao hividianana fo.",
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.secondary }]}>
          {i18n.t("language")}
        </Text>
        <View
          style={[
            styles.settingCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.langOption,
              language === "mg" && { backgroundColor: colors.secondary + "10" },
            ]}
            onPress={() => setLanguage("mg")}
          >
            <Text
              style={[
                styles.langText,
                {
                  color: language === "mg" ? colors.text : colors.textSecondary,
                },
                language === "mg" && { fontWeight: "bold" },
              ]}
            >
              Malagasy
            </Text>
            {language === "mg" && (
              <MaterialCommunityIcons
                name="check"
                size={20}
                color={colors.secondary}
              />
            )}
          </TouchableOpacity>
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
          <TouchableOpacity
            style={[
              styles.langOption,
              language === "fr" && { backgroundColor: colors.secondary + "10" },
            ]}
            onPress={() => setLanguage("fr")}
          >
            <Text
              style={[
                styles.langText,
                {
                  color: language === "fr" ? colors.text : colors.textSecondary,
                },
                language === "fr" && { fontWeight: "bold" },
              ]}
            >
              Français
            </Text>
            {language === "fr" && (
              <MaterialCommunityIcons
                name="check"
                size={20}
                color={colors.secondary}
              />
            )}
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.secondary }]}>
          Fisehoana (Appearance)
        </Text>
        <View
          style={[
            styles.settingCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <MaterialCommunityIcons
                name={
                  theme === "light"
                    ? "white-balance-sunny"
                    : "moon-waning-crescent"
                }
                size={24}
                color={colors.textSecondary}
              />
              <Text style={[styles.switchLabel, { color: colors.text }]}>
                Maizina (Dark Mode)
              </Text>
            </View>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: colors.accent }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.secondary }]}>
          Tsena (Shop)
        </Text>
        <TouchableOpacity
          style={[
            styles.shopCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.accent + "40",
            },
          ]}
          onPress={handleBuyHeart}
        >
          <View style={styles.shopInfo}>
            <MaterialCommunityIcons
              name="heart-plus"
              size={30}
              color={colors.error}
            />
            <View style={styles.shopTexts}>
              <Text style={[styles.shopTitle, { color: colors.text }]}>
                Hividy fo (1)
              </Text>
              <Text style={[styles.shopDesc, { color: colors.textSecondary }]}>
                Ampitomboy ny vintanao
              </Text>
            </View>
          </View>
          <View
            style={[styles.priceTag, { backgroundColor: colors.accent + "20" }]}
          >
            <Text style={[styles.priceText, { color: colors.accent }]}>50</Text>
            <MaterialCommunityIcons
              name="diamond-stone"
              size={16}
              color={colors.accent}
            />
          </View>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { color: colors.secondary }]}>
          Fikirana hafa
        </Text>
        <View
          style={[
            styles.settingCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <MaterialCommunityIcons
                name="volume-high"
                size={24}
                color={colors.textSecondary}
              />
              <Text style={[styles.switchLabel, { color: colors.text }]}>
                Feo (Sound)
              </Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: "#767577", true: colors.accent }}
              thumbColor={colors.white}
            />
          </View>
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <MaterialCommunityIcons
                name="bell"
                size={24}
                color={colors.textSecondary}
              />
              <Text style={[styles.switchLabel, { color: colors.text }]}>
                Fampilazana
              </Text>
            </View>
            <Switch
              value={false}
              trackColor={{ false: "#767577", true: colors.accent }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={[styles.aboutTitle, { color: colors.textSecondary }]}>
            Baiboly Quiz v1.0.0
          </Text>
          <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
            Namboarin'i Antigravity ho an'i Sophie
          </Text>
          <TouchableOpacity style={styles.shareButton}>
            <MaterialCommunityIcons
              name="share-variant"
              size={20}
              color={colors.secondary}
            />
            <Text style={[styles.shareText, { color: colors.secondary }]}>
              Hizara ny lalao
            </Text>
          </TouchableOpacity>
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
  sectionTitle: {
    ...Typography.h2,
    marginTop: Spacing.l,
    marginBottom: Spacing.m,
  },
  settingCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  langOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.m,
  },
  langText: {
    ...Typography.body,
  },
  separator: {
    height: 1,
  },
  shopCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.m,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shopInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  shopTexts: {
    marginLeft: Spacing.m,
  },
  shopTitle: {
    ...Typography.body,
    fontWeight: "bold",
  },
  shopDesc: {
    ...Typography.caption,
  },
  priceTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.s,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceText: {
    fontWeight: "bold",
    marginRight: 4,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.m,
  },
  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    ...Typography.body,
    marginLeft: 12,
  },
  aboutSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  aboutTitle: {
    ...Typography.body,
    fontWeight: "bold",
  },
  aboutText: {
    ...Typography.caption,
    marginTop: 4,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.m,
    padding: Spacing.s,
  },
  shareText: {
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default SettingsScreen;
