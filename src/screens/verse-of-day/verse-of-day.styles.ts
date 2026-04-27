import { Platform, StyleSheet } from "react-native";

export const createVerseOfDayStyles = (colors: any) =>
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

    navBar: {
      height: 64,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      zIndex: 10,
    },

    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.surfaceSoft,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },

    navTitleText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "900",
      letterSpacing: 0.8,
      marginLeft: 10,
    },

    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 24,
    },

    heroCardContainer: {
      minHeight: 410,
      borderRadius: 32,
      overflow: "hidden",
      marginTop: 10,
      marginBottom: 24,
      ...Platform.select({
        ios: {
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
        },
        android: {
          elevation: 12,
        },
      }),
    },

    heroGradient: {
      flex: 1,
    },

    heroTextureLayer: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.15,
    },

    heroTextureBg: {
      position: "absolute",
      bottom: -40,
      right: -30,
    },

    heroContent: {
      flex: 1,
      padding: 22,
      justifyContent: "space-between",
    },

    topMetaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    heroStatusBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.1)",
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.14)",
    },

    pulseDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.secondary,
      marginRight: 8,
    },

    heroStatusText: {
      color: "#fff",
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 0.4,
    },

    resetPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 18,
      backgroundColor: colors.secondarySoft,
      borderWidth: 1,
      borderColor: colors.secondary,
    },

    resetPillText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: "800",
    },

    heroDateText: {
      color: "rgba(255,255,255,0.55)",
      fontSize: 12,
      fontWeight: "700",
      marginTop: 12,
    },

    categoryMiniBadge: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 16,
      backgroundColor: "rgba(255,255,255,0.08)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.12)",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 18,
    },

    categoryMiniEmoji: {
      fontSize: 16,
    },

    categoryMiniText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "700",
    },

    heroTextWrapper: {
      marginTop: 24,
      alignItems: "center",
    },

    heroVerseBody: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "800",
      textAlign: "center",
      lineHeight: 36,
      fontStyle: "italic",
      paddingHorizontal: 6,
      textShadowColor: "rgba(0,0,0,0.35)",
      textShadowRadius: 12,
    },

    heroVerseRef: {
      color: colors.primary,
      fontSize: 17,
      fontWeight: "900",
      marginTop: 18,
      letterSpacing: 0.8,
    },

    heroBottomActions: {
      marginTop: 24,
      alignItems: "center",
    },

    readMoreBtn: {
      borderRadius: 18,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.16)",
    },

    readMoreGradient: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 18,
      paddingVertical: 11,
      gap: 8,
    },

    readMoreText: {
      color: "#fff",
      fontSize: 13,
      fontWeight: "700",
    },

    heroActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginBottom: 28,
    },

    actionCircle: {
      alignItems: "center",
      gap: 8,
    },

    circleBg: {
      width: 58,
      height: 58,
      borderRadius: 29,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },

    actionLabel: {
      color: colors.textSecondary,
      fontSize: 11,
      fontWeight: "800",
    },

    sectionHeader: {
      marginBottom: 14,
    },

    sectionTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 4,
    },

    sectionSubtitle: {
      color: colors.textSecondary,
      fontSize: 13,
      fontWeight: "500",
    },

    groupedList: {
      borderRadius: 18,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },

    groupBlock: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    categoryRow: {
      minHeight: 72,
      paddingHorizontal: 16,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    categoryRowActive: {
      backgroundColor: colors.surfaceSoft,
    },

    categoryRowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      flex: 1,
      paddingRight: 10,
    },

    categoryRowEmoji: {
      fontSize: 22,
    },

    categoryRowTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 2,
    },

    categoryRowSubtitle: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: "500",
    },

    versesPanel: {
      backgroundColor: "rgba(0,0,0,0.12)",
      paddingBottom: 6,
    },

    verseRow: {
      minHeight: 62,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },

    verseRowSelected: {
      backgroundColor: colors.secondarySoft,
    },

    verseRowText: {
      flex: 1,
      paddingRight: 12,
    },

    verseRowReference: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "800",
      marginBottom: 4,
    },

    verseRowSummary: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 18,
    },

    selectedPill: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 14,
      backgroundColor: colors.secondarySoft,
      borderWidth: 1,
      borderColor: colors.secondary,
    },

    selectedPillText: {
      color: colors.primary,
      fontSize: 11,
      fontWeight: "800",
    },

    hiddenLayer: {
      position: "absolute",
      opacity: 0,
      pointerEvents: "none",
    },

    shareCardContainer: {
      width: 1080,
      height: 1080,
      justifyContent: "center",
      alignItems: "center",
      padding: 80,
    },

    shareDecor: {
      position: "absolute",
      borderRadius: 400,
    },

    shareCardInner: {
      flex: 1,
      width: "100%",
      backgroundColor: "rgba(255,255,255,0.02)",
      borderRadius: 60,
      borderWidth: 2,
      borderColor: "rgba(255,255,255,0.1)",
      padding: 60,
      alignItems: "center",
      justifyContent: "space-between",
    },

    shareTopSection: {
      alignItems: "center",
    },

    shareEmojiBadge: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: colors.primarySoft,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
      borderWidth: 4,
      borderColor: colors.primary,
    },

    shareEmojiText: {
      fontSize: 80,
    },

    shareCatName: {
      color: colors.primary,
      fontSize: 28,
      fontWeight: "900",
      letterSpacing: 1,
      textAlign: "center",
    },

    shareQuoteBox: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },

    quoteIconTop: {
      position: "absolute",
      top: 0,
      left: -20,
    },

    quoteIconBottom: {
      position: "absolute",
      bottom: 0,
      right: -20,
    },

    shareMainText: {
      color: "#fff",
      fontSize: 54,
      fontWeight: "800",
      textAlign: "center",
      lineHeight: 80,
      fontStyle: "italic",
      paddingVertical: 40,
    },

    shareRefText: {
      color: colors.primary,
      fontSize: 40,
      fontWeight: "900",
      marginTop: 20,
    },

    shareFooterOuter: {
      alignItems: "center",
      width: "100%",
    },

    shareLine: {
      width: "60%",
      height: 3,
      backgroundColor: "rgba(255,255,255,0.1)",
      marginBottom: 40,
      borderRadius: 2,
    },

    shareAppBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
      marginBottom: 15,
    },

    shareAppTitle: {
      color: "#fff",
      fontSize: 32,
      fontWeight: "900",
      letterSpacing: 4,
    },

    shareTagline: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 22,
      fontWeight: "700",
    },
  });