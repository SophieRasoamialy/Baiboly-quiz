import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const createFriendSearchStyles = (colors: any) =>
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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
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

    headerTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "900",
      letterSpacing: -0.5,
    },

    searchContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },

    searchWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 20,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },

    input: {
      flex: 1,
      height: 56,
      color: colors.text,
      fontSize: 16,
      marginLeft: 12,
      fontWeight: "600",
    },

    content: {
      flex: 1,
      marginTop: 10,
    },

    listContent: {
      padding: 20,
      paddingTop: 10,
    },

    userItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 22,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 14,
    },

    avatarWrapper: {
      position: "relative",
    },

    itemAvatar: {
      width: 54,
      height: 54,
      borderRadius: 27,
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.border,
    },

    statusDot: {
      position: "absolute",
      bottom: 2,
      right: 2,
      width: 14,
      height: 14,
      borderRadius: 7,
      borderWidth: 2,
      borderColor: colors.card,
    },

    statusOnline: {
      backgroundColor: colors.secondary,
    },

    statusOffline: {
      backgroundColor: colors.textMuted,
    },

    userInfo: {
      flex: 1,
    },

    userName: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "800",
      letterSpacing: -0.3,
    },

    userChurch: {
      color: colors.textMuted,
      fontSize: 12,
      marginTop: 2,
    },

    inviteBtn: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 14,
    },

    inviteBtnDisabled: {
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.border,
    },

    inviteText: {
      color: "#000",
      fontSize: 12,
      fontWeight: "900",
    },

    inviteTextDisabled: {
      color: colors.textMuted,
    },

    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
      marginTop: -80,
    },

    emptyText: {
      color: colors.textMuted,
      fontSize: 15,
      textAlign: "center",
      marginTop: 20,
      lineHeight: 22,
    },
  });
