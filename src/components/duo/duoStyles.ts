import { StyleSheet } from "react-native";

export const createDuoStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    backgroundFill: {
      ...StyleSheet.absoluteFillObject,
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

    playerSide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },

    inverted: {
      transform: [{ rotate: "180deg" }],
    },

    buzzer: {
      width: 140,
      height: 140,
      borderRadius: 70,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 8,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },

    buzzerGradient: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    buzzerText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "900",
      letterSpacing: 1,
    },

    optionsContainer: {
      width: "100%",
      gap: 12,
    },

    optionBtn: {
      backgroundColor: colors.card,
      padding: 18,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    optionText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },

    waitText: {
      color: colors.textMuted,
      fontSize: 14,
      fontWeight: "600",
      letterSpacing: 1,
      textAlign: "center",
    },

    scorePill: {
      position: "absolute",
      bottom: 30,
      backgroundColor: colors.surfaceSoft,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
    },

    score: {
      color: colors.text,
      fontWeight: "900",
      fontSize: 16,
    },

    questionCard: {
      padding: 24,
      borderRadius: 24,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginHorizontal: 20,
      alignItems: "center",
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },

    question: {
      color: colors.text,
      textAlign: "center",
      fontWeight: "800",
      fontSize: 18,
      lineHeight: 26,
    },

    counter: {
      color: colors.secondary,
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 12,
    },

    gameOver: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 30,
    },

    gameOverTitle: {
      fontSize: 32,
      color: colors.text,
      fontWeight: "900",
      marginBottom: 10,
    },

    finalScore: {
      color: colors.textSecondary,
      fontSize: 18,
      fontWeight: "600",
      marginVertical: 30,
      textAlign: "center",
      lineHeight: 28,
    },

    exitBtn: {
      backgroundColor: colors.primary,
      paddingVertical: 18,
      paddingHorizontal: 40,
      borderRadius: 18,
      width: "100%",
      alignItems: "center",
    },

    exitText: {
      color: "#000",
      fontWeight: "900",
      fontSize: 16,
      letterSpacing: 0.5,
    },
  });