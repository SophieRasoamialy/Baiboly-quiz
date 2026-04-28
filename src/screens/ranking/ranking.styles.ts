import { StyleSheet } from "react-native";
import { spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 40,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: "center",
    overflow: "hidden", // For gems
    position: 'relative'
  },
  headerGlow: {
    position: 'absolute',
    top: 50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    filter: 'blur(60px)',
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 10,
    flex: 1,
  },
  topThreeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "flex-end",
  },
  topPlayerItem: {
    alignItems: "center",
  },
  podiumAvatarWrap: {
    marginBottom: 8,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  podiumTier: {
    marginTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    maxWidth: 110,
  },
  podiumTierText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  rankBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  rankBadgeText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  topPlayerName: {
    fontWeight: "bold",
    fontSize: 13,
    textAlign: 'center',
    width: '100%',
  },
  topPlayerScore: {
    fontSize: 12,
    fontWeight: "bold",
  },
  podiumSubInfo: {
    fontSize: 9,
    marginTop: 1,
    opacity: 0.7,
    textAlign: 'center',
    fontWeight: '500',
    paddingHorizontal: 4,
  },
  listContent: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  playerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  rankText: {
    width: 34,
    fontWeight: "900",
    fontSize: 18,
    opacity: 0.5,
  },
  // UserAvatar in the list handled by component size prop
  playerNameCol: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  playerName: {
    fontWeight: "700",
    fontSize: 15,
  },
  playerSubInfo: {
    fontSize: 11,
    marginTop: 2,
    opacity: 0.65,
  },
  playerScore: {
    fontWeight: "800",
    fontSize: 14,
  },
});
