import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const AVATAR_OPTION_SIZE = (width - 40 - 28) / 3;

export const createProfileStyles = (colors: any) =>
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
      paddingBottom: 60,
    },

    topGlowLeft: {
      position: "absolute",
      top: -80,
      left: -60,
      width: 280,
      height: 280,
      borderRadius: 140,
      backgroundColor: "rgba(0,184,148,0.09)",
    },

    topGlowRight: {
      position: "absolute",
      bottom: 180,
      right: -80,
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: "rgba(249,168,37,0.05)",
    },

    headerWrap: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 8,
    },

    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
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

    headerEyebrow: {
      color: colors.secondary,
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginBottom: 2,
    },

    headerTitle: {
      color: colors.text,
      fontSize: 24,
      fontWeight: "900",
      letterSpacing: 0.3,
      marginLeft: 10,
    },

    dividerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 24,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },

    heroWrap: {
      alignItems: "center",
      paddingHorizontal: 24,
    },

    avatarOuterRing: {
      position: "absolute",
      width: 116,
      height: 116,
      borderRadius: 28,
      borderWidth: 2,
      borderColor: colors.secondary,
    },

    avatarGradientWrap: {
      borderRadius: 24,
      padding: 3,
    },

    avatarInnerWrap: {
      backgroundColor: colors.surface,
      borderRadius: 22,
      overflow: "hidden",
      width: 100,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
    },

    userNameRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginTop: 16,
      marginBottom: 8,
    },

    userName: {
      color: colors.text,
      fontSize: 24,
      fontWeight: "900",
      letterSpacing: 0.3,
      textAlign: "center",
    },

    editButton: {
      width: 32,
      height: 32,
      borderRadius: 10,
      backgroundColor: colors.surfaceSoft,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },

    chipsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 8,
    },

    infoChip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.secondarySoft,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 14,
      gap: 5,
      borderWidth: 1,
      borderColor: colors.border,
    },

    infoChipText: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: "600",
    },

    guestCard: {
      width: "100%",
      marginTop: 24,
      backgroundColor: colors.card,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 18,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: colors.mode === "light" ? 0.08 : 0.2,
      shadowRadius: 18,
      elevation: 4,
    },

    giftBanner: {
      borderRadius: 18,
      overflow: "hidden",
      marginBottom: 18,
    },

    giftBannerContent: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      gap: 14,
    },

    giftIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: "rgba(0,0,0,0.12)",
      justifyContent: "center",
      alignItems: "center",
    },

    guestTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "800",
      textAlign: "center",
      marginBottom: 6,
    },

    guestText: {
      color: colors.textSecondary,
      fontSize: 13,
      textAlign: "center",
      lineHeight: 20,
      marginBottom: 20,
    },

    primaryCta: {
      borderRadius: 18,
      overflow: "hidden",
    },

    primaryCtaInner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      gap: 10,
    },

    secondaryCta: {
      marginTop: 12,
      minHeight: 54,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceSoft,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },

    secondaryCtaText: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "800",
      letterSpacing: 0.3,
    },

    sectionWrap: {
      paddingHorizontal: 20,
      marginTop: 28,
    },

    sectionTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 18,
    },

    sectionMarker: {
      width: 4,
      height: 20,
      borderRadius: 2,
    },

    sectionTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "800",
      letterSpacing: 0.3,
    },

    countBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      borderWidth: 1,
    },

    countBadgeText: {
      fontSize: 11,
      fontWeight: "800",
    },

    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginTop: 32,
    },

    statCard: {
      width: "100%",
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 22,
      padding: 18,
      alignItems: "center",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: colors.mode === "light" ? 0.08 : 0.2,
      shadowRadius: 18,
      elevation: 4,
    },

    statIconWrap: {
      width: 46,
      height: 46,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      borderWidth: 1,
    },

    statLabel: {
      color: colors.textMuted,
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1.2,
      textTransform: "uppercase",
      marginBottom: 4,
    },

    statValue: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "900",
    },

    medalsScroll: {
      paddingBottom: 8,
    },

    medalCard: {
      width: 105,
      height: 130,
      marginRight: 14,
      borderRadius: 22,
      overflow: "hidden",
      borderWidth: 1.5,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: colors.card,
    },

    medalIconWrap: {
      width: 52,
      height: 52,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      marginBottom: 8,
    },

    medalName: {
      fontWeight: "800",
      fontSize: 13,
      letterSpacing: 0.3,
    },

    medalBadge: {
      marginTop: 6,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
    },

    medalBadgeText: {
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
    },

    avatarGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 14,
      justifyContent: "space-between",
    },

    avatarOption: {
      width: AVATAR_OPTION_SIZE,
      height: AVATAR_OPTION_SIZE + 25, // Extra space for name
      borderRadius: 20,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 8, // Shift image up slightly
    },

    avatarName: {
      fontSize: 10,
      fontWeight: "900",
      color: colors.textSecondary,
      marginTop: 4,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      textAlign: "center",
    },

    avatarCheck: {
      position: "absolute",
      top: 4,
      right: 4,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 1,
    },

    lockedBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
      borderWidth: 1,
    },

    lockedBadgeText: {
      fontSize: 10,
      fontWeight: "800",
    },

    logoutWrap: {
      paddingHorizontal: 20,
      marginTop: 6,
    },

    logoutButton: {
      borderRadius: 18,
      overflow: "hidden",
      borderWidth: 1.5,
    },

    logoutInner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      gap: 10,
    },

    logoutText: {
      fontWeight: "800",
      fontSize: 16,
    },
  });
