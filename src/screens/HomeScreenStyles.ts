import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  // ── Or chaud (PRIMARY) ──────────────────────────────
  gold: "#F9A825",
  goldDark: "#E65100",
  goldDeep: "#BF360C",
  goldLight: "#FFD54F",
  goldPale: "#FFF8E1",

  // ── Émeraude (SECONDARY) ────────────────────────────
  emerald: "#00B894",
  emeraldDark: "#00897B",
  emeraldDeep: "#00695C",
  emeraldLight: "#B2DFDB",
  emeraldPale: "#E0F7F4",

  // ── Corail (ACCENT) ─────────────────────────────────
  coral: "#FF6B6B",
  coralDark: "#E53935",
  coralLight: "#FFCDD2",

  // ── Navy (header / nav background) ──────────────────
  navy: "#1A1200", // très sombre teinté or
  navyMid: "#2C1E00", // brun-noir chaud

  // ── Surfaces ────────────────────────────────────────
  white: "#FFFFFF",
  surfaceLight: "#FFFBF0", // crème très légère, teinté or
  surfaceDark: "#1E1500",

  // ── Texte ────────────────────────────────────────────
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.75)",
  textDark: "#1A0F00",
  textMuted: "#8D7B5E",
};

export const styles = StyleSheet.create({
  container: { flex: 1 },

  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.48,
  },

  safeArea: { flex: 1 },

  // ── Header ──────────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    height: 60,
  },
  userStats: { flexDirection: "row", gap: 10 },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  statText: { color: COLORS.white, fontSize: 13, fontWeight: "700" },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.goldLight,
    overflow: "hidden",
  },

  // ── Scroll ──────────────────────────────────────────
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 10,
  },

  // ── Welcome ─────────────────────────────────────────
  welcomeSection: {
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  welcomeBack: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "400",
    opacity: 0.8,
  },
  userName: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },

  // ── Main Menu Cards Grid ─────────────────────────────
  menuGrid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  menuCard: {
    width: (width - 56) / 2,
    height: 180,
    borderRadius: 28,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardGradient: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  cardIcon: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 16,
  },
  cardInfo: {
    marginTop: 10,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  cardBgIcon: {
    position: "absolute",
    bottom: -15,
    right: -15,
    opacity: 0.15,
  },
});
