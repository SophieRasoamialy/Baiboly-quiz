import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const createHomeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    backgroundFill: {
      ...StyleSheet.absoluteFillObject,
    },

    safeArea: {
      flex: 1,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      minHeight: 64,
    },

    userStats: {
      flexDirection: "row",
      gap: 10,
    },

    statPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceSoft,
    },

    statText: {
      color: colors.text,
      fontWeight: "800",
      fontSize: 13,
    },

    timerText: {
      fontSize: 9,
      color: colors.textMuted,
      marginLeft: 2,
      fontWeight: "700",
    },

    avatarBtn: {
      justifyContent: "center",
      alignItems: "center",
    },

    scrollContent: {
      paddingTop: 6,
      paddingBottom: 40,
    },

    welcomeSection: {
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 28,
      alignItems: "center",
    },

    eyebrow: {
      fontSize: 13,
      letterSpacing: 1.2,
      textTransform: "uppercase",
      marginBottom: 8,
      color: colors.textSecondary,
    },

    menuGrid: {
      paddingHorizontal: 20,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 16,
    },

    glowLeft: {
      position: "absolute",
      top: -60,
      left: -40,
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: colors.primarySoft,
      opacity: colors.mode === "light" ? 0.35 : 0.08,
    },

    glowRight: {
      position: "absolute",
      top: -40,
      right: -50,
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: colors.secondarySoft,
      opacity: colors.mode === "light" ? 0.3 : 0.06,
    },

    heroContainer: {
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 20,
    },

    heroGreeting: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 6,
    },

    heroTitle: {
      fontSize: 28,
      fontWeight: "900",
      color: colors.text,
      lineHeight: 34,
    },

    heroSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 6,
    },

    playButton: {
      marginTop: 18,
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 16,
      alignItems: "center",
      shadowColor: colors.primary,
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 3,
    },

    playText: {
      color: "#fff",
      fontWeight: "800",
      fontSize: 15,
    },
  });
