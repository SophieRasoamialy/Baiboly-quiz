import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const createThemeSelectionStyles = (colors: any) =>
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

    // ── Header ──────────────────────────────────
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 10,
      gap: 12,
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

    headerTitle: {
      flex: 1,
      fontSize: 20,
      fontWeight: "900",
      letterSpacing: -0.5,
      color: colors.text,
    },

    // ── Scroll content ───────────────────────────
    scrollContent: {
      paddingTop: 4,
      paddingHorizontal: 20,
      paddingBottom: 40,
    },

    // ── Section hero ─────────────────────────────
    hero: {
      paddingVertical: 24,
      alignItems: "center",
    },

    eyebrow: {
      fontSize: 11,
      letterSpacing: 1.8,
      textTransform: "uppercase",
      color: colors.textMuted,
      marginBottom: 6,
    },

    heroTitle: {
      fontSize: 30,
      fontWeight: "900",
      letterSpacing: -0.6,
      color: colors.text,
      textAlign: "center",
    },

    heroSubtitle: {
      fontSize: 13,
      marginTop: 6,
      color: colors.textMuted,
      textAlign: "center",
    },

    // ── Random card ──────────────────────────────
    randomCard: {
      borderRadius: 20,
      marginBottom: 20,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
    },

    randomGradient: {
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },

    randomIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "rgba(255,255,255,0.15)",
      justifyContent: "center",
      alignItems: "center",
    },

    randomTitle: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "900",
      letterSpacing: -0.3,
    },

    randomSub: {
      color: "rgba(255,255,255,0.75)",
      fontSize: 12,
      marginTop: 3,
    },

    randomArrow: {
      marginLeft: "auto" as any,
    },

    // ── Section label ─────────────────────────────
    sectionLabel: {
      fontSize: 11,
      letterSpacing: 1.8,
      textTransform: "uppercase",
      color: colors.textMuted,
      marginBottom: 12,
      fontWeight: "700",
    },

    // ── Theme card ───────────────────────────────
    themeCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 14,
    },

    themeIconWrap: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.surfaceSoft,
      justifyContent: "center",
      alignItems: "center",
    },

    themeTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: -0.2,
    },

    themeSub: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: 2,
    },

    themeArrow: {
      marginLeft: "auto" as any,
    },
  });