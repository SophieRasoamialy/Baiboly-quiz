import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const createOnlineQuizStyles = (colors: any) =>
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

    safeArea: {
      flex: 1,
    },

    scoreBoard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 5,
    },

    playerInfo: {
      alignItems: "center",
      flex: 1,
    },

    avatarMini: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
      backgroundColor: colors.surfaceSoft,
    },

    avatarImg: {
      width: "100%",
      height: "100%",
    },

    scorePill: {
      backgroundColor: colors.surfaceSoft,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      marginTop: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },

    scoreText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "900",
    },

    nameText: {
      color: colors.textMuted,
      fontSize: 10,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 4,
    },

    timerCenter: {
      width: 60,
      alignItems: "center",
    },

    timerCircle: {
      width: 46,
      height: 46,
      borderRadius: 23,
      borderWidth: 3,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.card,
    },

    timerText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "900",
    },

    quizArea: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 10,
    },

    questionCard: {
      backgroundColor: colors.card,
      padding: 24,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 24,
    },

    questionCounter: {
      color: colors.secondary,
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 10,
    },

    questionText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800",
      lineHeight: 26,
    },

    optionsGrid: {
      gap: 10,
    },

    optionBtn: {
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    optionBtnSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primarySoft,
    },

    optionBtnCorrect: {
      borderColor: colors.secondary,
      backgroundColor: colors.secondarySoft,
    },

    optionBtnWrong: {
      borderColor: colors.accent,
      backgroundColor: "rgba(255,107,107,0.1)",
    },

    optionText: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "600",
      flex: 1,
    },

    indicators: {
      flexDirection: "row",
      gap: 6,
    },

    playerTag: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },

    opponentTag: {
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },

    tagText: {
      color: "#fff",
      fontSize: 9,
      fontWeight: "900",
    },

    gameOver: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
    },

    medalCircle: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: colors.surfaceSoft,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors.border,
    },

    resultTitle: {
      color: colors.text,
      fontSize: 32,
      fontWeight: "900",
      marginBottom: 10,
      letterSpacing: -0.5,
    },

    resultScores: {
      color: colors.primary,
      fontSize: 40,
      fontWeight: "900",
      marginBottom: 50,
    },

    homeBtn: {
      width: "100%",
      height: 60,
      borderRadius: 20,
      overflow: "hidden",
    },

    homeGradient: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    homeText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "900",
      letterSpacing: 0.5,
    },
  });
