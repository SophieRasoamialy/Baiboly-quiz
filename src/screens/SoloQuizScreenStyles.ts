import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const COLORS = {
  // ── Or chaud (PRIMARY) ──────────────────────────────
  gold:          "#F9A825",
  goldDark:      "#E65100",
  goldDeep:      "#BF360C",
  goldLight:     "#FFD54F",

  // ── Émeraude (SECONDARY) ────────────────────────────
  emerald:       "#00B894",
  emeraldDark:   "#00897B",
  emeraldDeep:   "#00695C",
  emeraldLight:  "#B2DFDB",

  // ── Corail (ACCENT) ─────────────────────────────────
  coral:         "#FF6B6B",
  coralDark:     "#E53935",

  // ── Navy teinté or (fond) ────────────────────────────
  navy:          "#1A1200",
  navyMid:       "#2C1E00",

  // ── Surfaces ────────────────────────────────────────
  white:         "#FFFFFF",
  correctBg:     "#E8F5E9",
  correctBorder: "#00B894",   // émeraude pour "correct" (lisible sur blanc)
  wrongBg:       "#FFEBEE",
  wrongBorder:   "#FF6B6B",
  neutralBg:     "#F8F9FA",
  neutralBorder: "#E0E0E0",
  textDark:      "#1A0F00",
  textMuted:     "#8D7B5E",
};

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    width: "100%",
  },
  absoluteFull: {
    ...StyleSheet.absoluteFillObject,
  },

  // ── Top bar ─────────────────────────────────────────
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  questionCount: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  timerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 2,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },

  // ── Progress bar ────────────────────────────────────
  progressBarBg: {
    marginHorizontal: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },

  // ── Main card ────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  mainCard: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 24,
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  themeTag: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: "500",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  questionText: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textDark,
    lineHeight: 32,
    marginBottom: 14,
  },
  verseLink: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  verseLinkText: {
    fontSize: 13,
    color: COLORS.emeraldDark,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  // ── Options ─────────────────────────────────────────
  optionsContainer: {
    gap: 12,
  },
  optionBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },

  // ── Next button (or chaud = primary) ────────────────
  nextWrapper: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
  },
  nextButton: {
    borderRadius: 18,
    overflow: "hidden",
    elevation: 10,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  nextGradient: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // ── No hearts state ──────────────────────────────────
  noHeartsTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 16,
    marginBottom: 24,
  },
  backBtn: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 14,
  },
  backBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },

  // ── Modal ────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 28,
    borderRadius: 24,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.goldDark,   // titre modal en or foncé
  },
  modalText: {
    fontSize: 16,
    color: COLORS.textDark,
    fontStyle: "italic",
    lineHeight: 26,
  },
  closeButton: {
    marginTop: 24,
    borderRadius: 14,
    overflow: "hidden",
  },
  closeGradient: {
    paddingVertical: 14,
    alignItems: "center",
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
});