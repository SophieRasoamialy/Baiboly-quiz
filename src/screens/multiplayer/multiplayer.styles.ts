import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const createMultiplayerStyles = (colors: any) =>
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

    centerContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
    },

    iconCircle: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: colors.surfaceSoft,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 30,
    },

    title: {
      color: colors.text,
      fontSize: 32,
      fontWeight: "900",
      marginBottom: 10,
      textAlign: "center",
      letterSpacing: -0.5,
    },

    description: {
      color: colors.textMuted,
      fontSize: 15,
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 40,
    },

    mainButton: {
      width: "100%",
      height: 60,
      borderRadius: 20,
      overflow: "hidden",
    },

    buttonGradient: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    buttonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "900",
      letterSpacing: 0.5,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
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
      marginLeft: 10,
    },

    lobbyContent: {
      padding: 20,
      paddingBottom: 40,
    },

    userCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 32,
      gap: 16,
    },

    avatarCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: colors.surfaceSoft,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },

    avatarImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },

    badgeRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 8,
    },

    infoBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.secondarySoft,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      gap: 4,
    },

    badgeText: {
      color: colors.secondary,
      fontSize: 11,
      fontWeight: "700",
    },

    welcomeText: {
      color: colors.textMuted,
      fontSize: 13,
      fontWeight: "600",
      marginBottom: 2,
    },

    usernameText: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "900",
      letterSpacing: -0.5,
    },

    loginBtn: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
      marginTop: 10,
      alignSelf: "flex-start",
    },

    loginBtnText: {
      color: "#052e16",
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 0.2,
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

    gameCard: {
      borderRadius: 24,
      overflow: "hidden",
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },

    gameCardGradient: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      gap: 16,
    },

    gameIconWrapper: {
      width: 56,
      height: 56,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
    },

    gameInfo: {
      flex: 1,
    },

    gameTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "800",
      marginBottom: 2,
    },

    gameDesc: {
      color: colors.textMuted,
      fontSize: 12,
      lineHeight: 18,
    },

    betaTag: {
      backgroundColor: colors.primarySoft,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
    },

    betaText: {
      color: colors.primary,
      fontSize: 10,
      fontWeight: "900",
    },
  });
