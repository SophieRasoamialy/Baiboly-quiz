import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

// 40 = scrollContent horizontal padding, 32 = formCard inner padding (16*2), 24 = two gaps between 3 items
export const AUTH_AVATAR_SIZE = (width - 40 - 32 - 24) / 3;

export const createAuthStyles = (colors: any) =>
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

    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 60,
    },

    topGlowLeft: {
      position: "absolute",
      top: -70,
      left: -50,
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: "rgba(0,184,148,0.09)",
    },

    topGlowRight: {
      position: "absolute",
      top: -20,
      right: -60,
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: "rgba(249,168,37,0.05)",
    },

    header: {
      alignItems: "center",
      marginBottom: 24,
    },

    headerIconWrap: {
      width: 80,
      height: 80,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      marginBottom: 14,
    },

    title: {
      fontSize: 28,
      fontWeight: "900",
      textAlign: "center",
      color: colors.text,
      letterSpacing: -0.6,
    },

    subtitle: {
      marginTop: 8,
      fontSize: 14,
      lineHeight: 20,
      textAlign: "center",
      color: colors.textSecondary,
      maxWidth: 300,
    },

    rewardCard: {
      backgroundColor: colors.card,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginBottom: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: colors.mode === "light" ? 0.08 : 0.2,
      shadowRadius: 18,
      elevation: 4,
    },

    rewardRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    rewardIconWrap: {
      width: 46,
      height: 46,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },

    rewardTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: colors.text,
    },

    rewardSubtitle: {
      marginTop: 3,
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 17,
    },

    rewardBadge: {
      marginLeft: "auto",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
    },

    rewardBadgeText: {
      fontSize: 12,
      fontWeight: "800",
    },

    formCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: colors.mode === "light" ? 0.08 : 0.2,
      shadowRadius: 18,
      elevation: 4,
    },

    sectionLabel: {
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1.2,
      textTransform: "uppercase",
      color: colors.textSecondary,
      marginBottom: 10,
      marginTop: 6,
    },

    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceSoft,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 14,
      paddingHorizontal: 14,
      minHeight: 54,
    },

    inputIcon: {
      marginRight: 10,
    },

    input: {
      flex: 1,
      color: colors.text,
      fontSize: 15,
      fontWeight: "600",
      minHeight: 54,
    },

    avatarGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      justifyContent: "space-between",
      marginTop: 4,
      marginBottom: 24,
    },

    avatarOption: {
      width: AUTH_AVATAR_SIZE,
      height: AUTH_AVATAR_SIZE + 25, // Extra space for name
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      paddingTop: 8, // Shift image up slightly
    },

    avatarName: {
      fontSize: 10,
      fontWeight: "900",
      color: colors.textSecondary,
      marginTop: 4,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },

    avatarCheck: {
      position: "absolute",
      top: 4,
      right: 4,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 1,
    },

    submitButton: {
      width: "100%",
      borderRadius: 20,
      overflow: "hidden",
      marginTop: 4,
    },

    submitButtonInner: {
      minHeight: 58,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },

    submitButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "900",
      letterSpacing: 0.3,
    },

    helperText: {
      marginTop: 12,
      fontSize: 12,
      textAlign: "center",
      lineHeight: 18,
      color: colors.textMuted,
    },
    toggleModeButton: {
      marginTop: 20,
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    toggleModeText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    toggleModeLink: {
      color: colors.primary,
      fontWeight: "800",
    },
  });