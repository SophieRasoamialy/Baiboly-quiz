import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const createTeamQuizStyles = (colors: any) =>
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

    header: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    roundIndicator: {
      color: colors.textMuted,
      fontWeight: "800",
      fontSize: 12,
      letterSpacing: 1,
    },

    scoreTicker: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.surfaceSoft,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
    },

    scorePoint: {
      fontSize: 18,
      fontWeight: "900",
    },

    scoreDivider: {
      color: colors.textMuted,
      fontSize: 16,
      opacity: 0.5,
    },

    mainArea: {
      flex: 1,
      paddingHorizontal: 20,
    },

    centerPhase: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    scrollPhase: {
      paddingVertical: 20,
      alignItems: "center",
    },

    phaseTitle: {
      color: colors.text,
      fontSize: 36,
      fontWeight: "900",
      marginTop: 10,
      letterSpacing: -0.5,
      textAlign: "center",
    },

    phaseSubtitle: {
      color: colors.textMuted,
      fontSize: 15,
      marginTop: 5,
      textAlign: "center",
      lineHeight: 22,
    },

    playerGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 20,
      marginTop: 40,
      justifyContent: "center",
    },

    playerSlot: {
      alignItems: "center",
      width: 80,
    },

    avatarMini: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.surfaceSoft,
      overflow: "hidden",
    },

    playerName: {
      color: colors.text,
      fontSize: 12,
      marginTop: 8,
      fontWeight: "700",
    },

    teamBadge: {
      position: "absolute",
      top: -4,
      right: -4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: colors.card,
    },

    teamText: {
      color: "#fff",
      fontSize: 9,
      fontWeight: "900",
    },

    roundText: {
      color: colors.secondary,
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 4,
      marginBottom: 30,
      textTransform: "uppercase",
    },

    roleCard: {
      alignItems: "center",
      padding: 24,
      borderRadius: 32,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      width: "100%",
    },

    roleLabel: {
      color: colors.textMuted,
      fontSize: 11,
      fontWeight: "900",
      marginBottom: 20,
      letterSpacing: 2,
      textTransform: "uppercase",
    },

    avatarLarge: {
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 4,
      borderColor: colors.secondary,
      backgroundColor: colors.surfaceSoft,
      overflow: "hidden",
    },

    roleName: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "900",
      marginTop: 20,
      letterSpacing: -0.5,
    },

    describerHeader: {
      alignItems: "center",
      marginBottom: 40,
    },

    secretLabel: {
      color: colors.secondary,
      fontSize: 12,
      fontWeight: "800",
      marginBottom: 10,
      textTransform: "uppercase",
      letterSpacing: 2,
    },

    secretWord: {
      color: colors.text,
      fontSize: 48,
      fontWeight: "900",
      textAlign: "center",
      letterSpacing: -1,
    },

    secretHint: {
      color: colors.textMuted,
      fontSize: 16,
      marginTop: 10,
      textAlign: "center",
    },

    instructionBox: {
      backgroundColor: colors.secondarySoft,
      padding: 20,
      borderRadius: 20,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors.secondary,
    },

    instructionText: {
      color: colors.secondaryDark,
      fontSize: 14,
      fontWeight: "700",
      textAlign: "center",
      lineHeight: 20,
    },

    wordInputs: {
      width: "100%",
      gap: 16,
      marginBottom: 40,
    },

    wordInput: {
      width: "100%",
      height: 60,
      backgroundColor: colors.card,
      borderRadius: 18,
      paddingHorizontal: 20,
      color: colors.text,
      fontSize: 18,
      fontWeight: "700",
      borderWidth: 1,
      borderColor: colors.border,
    },

    actionBtn: {
      width: "100%",
      height: 65,
      borderRadius: 20,
      overflow: "hidden",
      elevation: 4,
    },

    btnGradient: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    btnText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "900",
      letterSpacing: 1,
    },

    timerBar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 4,
      borderColor: colors.secondary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
      backgroundColor: colors.surfaceSoft,
    },

    timerText: {
      color: colors.text,
      fontSize: 32,
      fontWeight: "900",
    },

    clueRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 40,
      justifyContent: "center",
    },

    clueCard: {
      backgroundColor: colors.secondarySoft,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.secondary,
    },

    clueText: {
      color: colors.secondaryDark,
      fontSize: 16,
      fontWeight: "800",
    },

    guessHint: {
      color: colors.textMuted,
      marginBottom: 20,
      fontSize: 14,
      fontWeight: "600",
    },

    mainGuessInput: {
      width: "100%",
      height: 75,
      backgroundColor: colors.card,
      borderRadius: 24,
      paddingHorizontal: 25,
      color: colors.text,
      fontSize: 28,
      fontWeight: "900",
      textAlign: "center",
      marginBottom: 30,
      borderWidth: 2,
      borderColor: colors.secondary,
    },

    stealTitle: {
      color: colors.accent,
      fontSize: 32,
      fontWeight: "900",
      marginTop: 20,
      letterSpacing: -0.5,
    },

    stealSub: {
      color: colors.textMuted,
      fontSize: 16,
      marginTop: 5,
      marginBottom: 30,
    },

    resultWordContainer: {
      alignItems: "center",
      marginBottom: 30,
    },

    resultWord: {
      color: colors.text,
      fontSize: 36,
      fontWeight: "900",
      marginTop: 20,
      textAlign: "center",
    },

    resultStatus: {
      color: colors.textMuted,
      fontSize: 18,
      fontWeight: "700",
      marginTop: 10,
    },

    gameOverTitle: {
      color: colors.secondary,
      fontSize: 42,
      fontWeight: "900",
      marginBottom: 40,
      letterSpacing: -1,
    },

    finalScoreGrid: {
      flexDirection: "row",
      gap: 16,
      marginBottom: 50,
    },

    finalScoreCard: {
      backgroundColor: colors.card,
      padding: 32,
      borderRadius: 32,
      alignItems: "center",
      minWidth: 140,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 4,
    },

    teamName: {
      color: colors.textMuted,
      fontSize: 11,
      fontWeight: "900",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 2,
    },

    finalPoints: {
      color: colors.text,
      fontSize: 56,
      fontWeight: "900",
      letterSpacing: -2,
    },
  });
