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

    playerSide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 12,
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
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 8,
    },

    optionBtn: {
      backgroundColor: colors.card,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "45%",
      flexGrow: 1,
    },

    optionText: {
      color: colors.text,
      fontSize: 14,
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
      fontSize: 14,
    },

    playerHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      gap: 8,
    },

    playerAvatarSmall: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },

    playerName: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "900",
      textTransform: "capitalize",
    },

    scorePillInline: {
      backgroundColor: colors.primary + "20",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.primary + "40",
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
      fontSize: 15,
      lineHeight: 22,
    },

    counter: {
      color: colors.secondary,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 6,
    },

    inSideQuestionContainer: {
      width: "100%",
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 10,
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
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

    winnerName: {
      fontSize: 24,
      color: colors.primary,
      fontWeight: "900",
      textAlign: "center",
      marginTop: 20,
      textTransform: "capitalize",
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