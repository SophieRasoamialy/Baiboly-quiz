import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const CHAPTER_ITEM_SIZE = (width - 40 - 30) / 4;

export const createBibleStyles = (colors: any) =>
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

    topGlowLeft: {
      position: "absolute",
      top: -80,
      left: -60,
      width: 280,
      height: 280,
      borderRadius: 140,
      backgroundColor: colors.primarySoft,
      opacity: colors.mode === "light" ? 0.35 : 0.08,
    },

    topGlowRight: {
      position: "absolute",
      bottom: 180,
      right: -80,
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: colors.secondarySoft,
      opacity: colors.mode === "light" ? 0.3 : 0.05,
    },

    headerWrap: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 16,
    },

    headerTopRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginBottom: 20,
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
    },

    headerEyebrow: {
      color: colors.mode === "light" ? colors.primary : colors.secondary,
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginBottom: 2,
    },

    headerTitle: {
      color: colors.text,
      fontSize: 26,
      fontWeight: "900",
      letterSpacing: 0.4,
      marginLeft: 10,
    },

    headerSubtitleTitle: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "900",
      marginLeft: 10,
    },

    badge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      borderWidth: 1,
      backgroundColor: colors.secondarySoft,
      borderColor: colors.border,
    },

    badgeText: {
      color: colors.secondary,
      fontSize: 12,
      fontWeight: "800",
    },

    dividerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },

    tabWrap: {
      flexDirection: "row",
      marginTop: 20,
      backgroundColor: colors.surfaceSoft,
      borderRadius: 18,
      padding: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },

    tabItem: {
      flex: 1,
      paddingVertical: 11,
      borderRadius: 14,
      alignItems: "center",
      overflow: "hidden",
    },

    tabLabel: {
      fontWeight: "800",
      fontSize: 13,
      letterSpacing: 0.3,
    },

    tabSubLabel: {
      fontWeight: "700",
      fontSize: 10,
      marginTop: 1,
    },

    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 50,
      paddingTop: 12,
    },

    bookCard: {
      borderRadius: 20,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      marginBottom: 10,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: colors.mode === "light" ? 0.08 : 0.2,
      shadowRadius: 18,
      elevation: 4,
    },

    bookCardInner: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 18,
      paddingVertical: 16,
    },

    bookIndex: {
      fontSize: 13,
      fontWeight: "800",
      width: 28,
      marginRight: 4,
    },

    bookName: {
      flex: 1,
      color: colors.text,
      fontSize: 17,
      fontWeight: "700",
      letterSpacing: 0.2,
    },

    chapterBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      borderWidth: 1,
      marginRight: 10,
    },

    chapterBadgeText: {
      fontSize: 11,
      fontWeight: "800",
    },

    chapterItem: {
      width: CHAPTER_ITEM_SIZE,
      height: 58,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },

    chapterItemText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800",
    },

    verseContainer: {
      marginBottom: 16,
    },

    verseTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
      marginTop: 6,
    },

    verseTitle: {
      color: colors.secondary,
      fontSize: 13,
      fontWeight: "800",
      fontStyle: "italic",
      textAlign: "center",
      flex: 3,
    },

    verseRow: {
      flexDirection: "row",
      gap: 12,
    },

    verseNumberWrap: {
      width: 26,
      height: 26,
      borderRadius: 8,
      backgroundColor: colors.primarySoft,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 1,
      borderWidth: 1,
      borderColor: colors.border,
    },

    verseNumberText: {
      color: colors.primary,
      fontSize: 11,
      fontWeight: "900",
    },

    verseText: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 26,
      flex: 1,
    },

    chapterInfoCard: {
      backgroundColor: colors.surfaceSoft,
      borderRadius: 16,
      padding: 14,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    chapterInfoText: {
      color: colors.textSecondary,
      fontSize: 13,
      fontWeight: "600",
      fontStyle: "italic",
      flex: 1,
    },

    searchScopeWrap: {
      paddingLeft: 20,
      marginBottom: 12,
    },

    searchScopeChip: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      marginRight: 8,
    },

    searchScopeChipText: {
      fontWeight: "600",
      fontSize: 13,
    },

    searchResultCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },

    searchResultTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },

    searchResultBook: {
      color: colors.secondary,
      fontWeight: "800",
      fontSize: 13,
    },

    searchResultVerse: {
      color: colors.primary,
      fontWeight: "900",
      fontSize: 13,
    },

    searchResultText: {
      color: colors.text,
      fontSize: 15,
      lineHeight: 22,
    },

    emptyText: {
      color: colors.textMuted,
      textAlign: "center",
      marginTop: 40,
    },

    loadingWrap: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },

    loadingCard: {
      width: 80,
      height: 80,
      borderRadius: 24,
      backgroundColor: colors.secondarySoft,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 16,
    },

    loadingText: {
      color: colors.textSecondary,
      fontWeight: "700",
      letterSpacing: 1,
    },
  });