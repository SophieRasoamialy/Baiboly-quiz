import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const createSoloQuizStyles = (colors: any) =>
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

    // ── Top bar ──────────────────────────────────
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 10,
      gap: 10,
      minHeight: 60,
    },

    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
    },

    statPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
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

    topBarSpacer: {
      flex: 1,
    },

    // ── Timer ────────────────────────────────────
    timerWrap: {
      marginHorizontal: 20,
      marginBottom: 20,
    },

    timerTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.surfaceSoft,
      overflow: "hidden",
    },

    timerFill: {
      height: "100%",
      borderRadius: 3,
    },

    timerLabel: {
      marginTop: 5,
      fontSize: 11,
      fontWeight: "700",
      color: colors.textMuted,
      textAlign: "right",
    },

    // ── Question ─────────────────────────────────
    body: {
      flex: 1,
      paddingHorizontal: 20,
    },

    questionCard: {
      backgroundColor: colors.card,
      borderRadius: 22,
      padding: 24,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },

    questionNumber: {
      fontSize: 11,
      letterSpacing: 1.8,
      textTransform: "uppercase",
      color: colors.textMuted,
      marginBottom: 10,
      fontWeight: "700",
    },

    question: {
      fontSize: 20,
      fontWeight: "900",
      letterSpacing: -0.4,
      color: colors.text,
      lineHeight: 28,
    },

    // ── Answers ──────────────────────────────────
    answerBtn: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 12,
    },

    answerBtnCorrect: {
      borderColor: colors.secondary,
      backgroundColor: colors.secondarySoft,
    },

    answerBtnWrong: {
      borderColor: colors.accent,
      backgroundColor: "rgba(255,107,107,0.08)",
    },

    answerLabel: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.surfaceSoft,
      justifyContent: "center",
      alignItems: "center",
    },

    answerLabelText: {
      fontWeight: "900",
      fontSize: 13,
      color: colors.textMuted,
    },

    answerText: {
      flex: 1,
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },
  });