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
      justifyContent: "center",
      alignItems: "center",
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

    questionImageContainer: {
      width: "100%",
      height: 200,
      borderRadius: 16,
      overflow: "hidden",
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: "rgba(0,0,0,0.05)",
    },

    questionImage: {
      width: "100%",
      height: "100%",
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
      padding: 30,
    },

    resultBanner: {
      width: "100%",
      borderRadius: 30,
      overflow: "hidden",
      marginBottom: 30,
      elevation: 10,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
    },

    bannerGradient: {
      padding: 30,
      alignItems: "center",
    },

    winnerAvatarRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      gap: 15,
    },

    avatarMiniCircle: {
      width: 80,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
    },

    trophyBadge: {
      width: 60,
      height: 60,
      borderRadius: 15,
      backgroundColor: "rgba(255,255,255,0.25)",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.4)",
    },

    bannerTitle: {
      fontSize: 22,
      fontWeight: "900",
      textAlign: "center",
      letterSpacing: -0.5,
    },

    resultScores: {
      color: colors.primary,
      fontSize: 48,
      fontWeight: "900",
      marginBottom: 40,
    },

    actionGroup: {
      width: "100%",
      gap: 15,
    },

    resultActionBtn: {
      width: "100%",
      height: 60,
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },

    actionText: {
      color: "#FFF",
      fontSize: 15,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
  });
