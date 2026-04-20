import { StyleSheet } from "react-native";

export const createSettingsStyles = (colors: any) =>
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

    content: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 40,
      gap: 18,
    },

    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },

    backButton: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: colors.surfaceSoft,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: 14,
    },

    header: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 8,
    },

    headerTitle: {
      fontSize: 26,
      fontWeight: "900",
      color: colors.text,
      letterSpacing: -0.4,
      marginLeft: 10,
    },

    headerSubtitle: {
      marginTop: 2,
      fontSize: 14,
      lineHeight: 20,
      color: colors.textSecondary,
      maxWidth: 280,
    },

    sectionWrapper: {
      gap: 10,
    },

    sectionTitle: {
      fontSize: 13,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
      color: colors.textSecondary,
      paddingHorizontal: 2,
    },

    card: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 22,
      overflow: "hidden",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: colors.mode === "light" ? 0.08 : 0.2,
      shadowRadius: 18,
      elevation: 4,
    },

    row: {
      minHeight: 62,
      paddingHorizontal: 16,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      paddingRight: 12,
    },

    rowIconWrap: {
      width: 40,
      height: 40,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },

    rowTextWrap: {
      flex: 1,
    },

    rowTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.text,
    },

    rowSubtitle: {
      marginTop: 2,
      fontSize: 12,
      lineHeight: 16,
      color: colors.textSecondary,
    },

    separator: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: 68,
    },

    selectedRow: {
      backgroundColor: colors.secondarySoft,
    },

    badge: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },

    badgeText: {
      fontSize: 12,
      fontWeight: "800",
    },

    themeSelector: {
      flexDirection: "row",
      gap: 12,
    },

    themeCard: {
      flex: 1,
      borderRadius: 20,
      borderWidth: 1,
      paddingVertical: 18,
      paddingHorizontal: 12,
      alignItems: "center",
      position: "relative",
      backgroundColor: colors.card,
      borderColor: colors.border,
    },

    themeCardActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primarySoft,
    },

    themeCardDot: {
      position: "absolute",
      top: 10,
      right: 10,
      width: 10,
      height: 10,
      borderRadius: 999,
    },

    themeIconCircle: {
      width: 56,
      height: 56,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },

    themeLabel: {
      fontSize: 15,
      fontWeight: "800",
    },

    themeSublabel: {
      fontSize: 12,
      marginTop: 4,
    },

    shopCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 22,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: colors.mode === "light" ? 0.08 : 0.2,
      shadowRadius: 18,
      elevation: 4,
    },

    shopLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      paddingRight: 12,
    },

    shopIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },

    shopTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: colors.text,
    },

    shopSubtitle: {
      marginTop: 3,
      fontSize: 12,
      color: colors.textSecondary,
    },

    aboutCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 22,
      padding: 20,
      alignItems: "center",
      marginTop: 6,
    },

    aboutTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: colors.text,
    },

    aboutText: {
      marginTop: 6,
      fontSize: 13,
      lineHeight: 18,
      color: colors.textSecondary,
      textAlign: "center",
    },

    shareButton: {
      marginTop: 14,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 999,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    shareText: {
      fontSize: 13,
      fontWeight: "800",
    },

    topGlowLeft: {
      position: "absolute",
      top: -50,
      left: -40,
      width: 170,
      height: 170,
      borderRadius: 85,
      backgroundColor: colors.primarySoft,
      opacity: colors.mode === "light" ? 0.35 : 0.08,
    },

    topGlowRight: {
      position: "absolute",
      top: -30,
      right: -50,
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: colors.secondarySoft,
      opacity: colors.mode === "light" ? 0.3 : 0.06,
    },
  });