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
      paddingBottom: 6,
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
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.surfaceSoft,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
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

    heroTitle: {
      fontSize: 34,
      fontWeight: "900",
      letterSpacing: -0.8,
      textAlign: "center",
    },

    heroSubtitle: {
      fontSize: 14,
      marginTop: 8,
      textAlign: "center",
      lineHeight: 20,
      maxWidth: 280,
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
      backgroundColor: "rgba(0,184,148,0.08)",
    },

    glowRight: {
      position: "absolute",
      top: -40,
      right: -50,
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: "rgba(249,168,37,0.06)",
    },
  });