import { StyleSheet } from "react-native";
import { spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 30,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
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
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
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
    borderColor: "#1A237E",
  },
  rankBadgeText: {
    color: "#1A237E",
    fontWeight: "bold",
    fontSize: 12,
  },
  topPlayerName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  topPlayerScore: {
    fontSize: 12,
    fontWeight: "bold",
  },
  listContent: {
    padding: spacing.lg,
  },
  playerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
  },
  rankText: {
    width: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
  smallAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  playerName: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
  },
  playerScore: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
