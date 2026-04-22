import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const TIMER_SECONDS = 20;

export const createImageQuizStyles = (colors: any) =>
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

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 10,
    },

    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
    },

    stats: {
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

    main: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 10,
    },

    timerTrack: {
      width: "100%",
      height: 6,
      backgroundColor: colors.surfaceSoft,
      borderRadius: 3,
      marginBottom: 24,
      overflow: "hidden",
    },

    timerBar: {
      height: "100%",
      borderRadius: 3,
    },

    quizCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },

    imageContainer: {
      width: "100%",
      height: 250,
      position: "relative",
      backgroundColor: colors.background,
      borderRadius: 16,
      overflow: "hidden",
    },

    quizImage: {
      width: "100%",
      height: "100%",
    },

    imageOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 60,
    },

    themeTag: {
      position: "absolute",
      top: 15,
      right: 15,
      backgroundColor: "rgba(0,0,0,0.6)",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },

    themeText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.5,
    },

    questionText: {
      padding: 24,
      fontSize: 18,
      fontWeight: "800",
      color: colors.text,
      textAlign: "center",
      lineHeight: 26,
    },

    optionsArea: {
      paddingHorizontal: 20,
      paddingBottom: 24,
      gap: 10,
    },

    optionBtn: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceSoft,
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

    optionLetter: {
      width: 28,
      height: 28,
      borderRadius: 8,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },

    optionLetterText: {
      fontWeight: "900",
      fontSize: 12,
      color: colors.textMuted,
    },

    optionText: {
      flex: 1,
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },

    nextBtnContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },

    nextBtn: {
      height: 60,
      borderRadius: 18,
      overflow: "hidden",
      elevation: 4,
    },

    nextGradient: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },

    nextBtnText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "900",
      letterSpacing: 0.5,
    },

    fullCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
    },

    noHeartsTitle: {
      color: colors.text,
      fontSize: 32,
      fontWeight: "900",
      marginTop: 20,
      letterSpacing: -0.5,
    },

    noHeartsSub: {
      color: colors.secondary,
      fontSize: 16,
      fontWeight: "700",
      marginTop: 10,
      marginBottom: 40,
    },

    buyBtn: {
      width: "100%",
      height: 60,
      borderRadius: 18,
      overflow: "hidden",
    },

    buyGradient: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    buyText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "800",
    },
  });
