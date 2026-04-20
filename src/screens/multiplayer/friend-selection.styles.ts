import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const createFriendSelectionStyles = (colors: any) =>
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

    content: {
      padding: 20,
    },

    cardGroup: {
      gap: 16,
      marginBottom: 32,
    },

    selectionCard: {
      borderRadius: 24,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },

    selectionGradient: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      gap: 16,
    },

    iconBox: {
      width: 52,
      height: 52,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.surfaceSoft,
    },

    cardInfo: {
      flex: 1,
    },

    cardTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "800",
      marginBottom: 2,
    },

    cardDesc: {
      color: colors.textMuted,
      fontSize: 12,
    },

    sectionTitle: {
      color: colors.textMuted,
      fontSize: 11,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 2,
      marginBottom: 20,
      marginLeft: 4,
    },

    friendsList: {
      gap: 12,
    },

    friendRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 14,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 14,
    },

    friendAvatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.surfaceSoft,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },

    friendImage: {
      width: "100%",
      height: "100%",
      borderRadius: 22,
    },

    friendInfo: {
      flex: 1,
    },

    friendName: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "700",
    },

    friendDetail: {
      color: colors.textMuted,
      fontSize: 11,
      marginTop: 1,
    },

    inviteBtn: {
      backgroundColor: colors.primarySoft,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.primary,
    },

    inviteText: {
      color: colors.primary,
      fontSize: 11,
      fontWeight: "800",
    },

    emptyFriends: {
      alignItems: "center",
      paddingVertical: 40,
      backgroundColor: colors.surfaceSoft,
      borderRadius: 24,
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: colors.border,
    },

    emptyFriendsText: {
      color: colors.textMuted,
      fontSize: 13,
      marginTop: 10,
      textAlign: "center",
      paddingHorizontal: 40,
    },
  });
