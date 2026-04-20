import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const createMatchmakingStyles = (colors: any) =>
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

    content: {
      flex: 1,
      padding: 20,
      alignItems: "center",
    },

    cancelBtn: {
      alignSelf: "flex-end",
      padding: 10,
      borderRadius: 20,
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.border,
    },

    mainGroup: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },

    radarContainer: {
      width: 240,
      height: 240,
      borderRadius: 120,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
      backgroundColor: colors.surfaceSoft,
    },

    radarLine: {
      position: "absolute",
      width: 120,
      height: 2,
      backgroundColor: colors.secondary,
      left: 120,
      top: 119,
      transformOrigin: "left",
      opacity: 0.8,
    },

    radarPulse: {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
    },

    centerAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.card,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },

    statusTitle: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "900",
      marginBottom: 10,
      textAlign: "center",
      letterSpacing: -0.5,
    },

    statusSub: {
      color: colors.textMuted,
      fontSize: 15,
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 22,
    },

    matchCard: {
      width: width * 0.85,
      padding: 32,
      borderRadius: 30,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      elevation: 10,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },

    foundText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 4,
      textTransform: "uppercase",
      marginBottom: 24,
    },

    opponentAvatarCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: colors.primary,
      overflow: "hidden",
      marginBottom: 20,
      backgroundColor: colors.surfaceSoft,
    },

    avatarImg: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },

    opponentName: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "900",
      marginBottom: 15,
      textAlign: "center",
      letterSpacing: -0.5,
    },

    opponentDetails: {
      width: "100%",
      gap: 10,
      marginBottom: 30,
    },

    badge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.secondarySoft,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 14,
      gap: 10,
      alignSelf: "center",
    },

    badgeText: {
      color: colors.secondary,
      fontSize: 14,
      fontWeight: "700",
    },

    startBadge: {
      paddingHorizontal: 25,
      paddingVertical: 12,
      borderRadius: 20,
    },

    startText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "800",
    },
  });
