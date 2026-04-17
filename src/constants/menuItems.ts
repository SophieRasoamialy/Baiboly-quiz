export interface HomeMenuItem {
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
  softAccent: string;
  route: string;
}

export const getHomeMenuItems = (colors: any): HomeMenuItem[] => [
  {
    title: "SOLO",
    subtitle: "Study the Bible",
    icon: "book-open-variant",
    accent: colors.primary,
    softAccent: colors.primarySoft,
    route: "ThemeSelection",
  },
  {
    title: "DUO",
    subtitle: "Challenge a friend",
    icon: "account-group",
    accent: colors.secondary,
    softAccent: colors.secondarySoft,
    route: "Multiplayer",
  },
  {
    title: "TENY TELO",
    subtitle: "2v2 Team Battle",
    icon: "account-multiple-plus",
    accent: colors.accent,
    softAccent: "rgba(255,107,107,0.14)",
    route: "TeamQuiz",
  },
  {
    title: "SARY",
    subtitle: "Identify the image",
    icon: "image-multiple-outline",
    accent: "#3B82F6",
    softAccent: "rgba(59,130,246,0.14)",
    route: "ImageQuiz",
  },
  {
    title: "BIBLE",
    subtitle: "Vakio ny Baiboly",
    icon: "book-outline",
    accent: "#22C55E",
    softAccent: "rgba(34,197,94,0.14)",
    route: "Bible",
  },
  {
    title: "VERS DU JOUR",
    subtitle: "Teny fampaherezana",
    icon: "script-text-outline",
    accent: "#A855F7",
    softAccent: "rgba(168,85,247,0.14)",
    route: "VerseOfDay",
  },
  {
    title: "RANKING",
    subtitle: "Global standing",
    icon: "trophy-outline",
    accent: "#F59E0B",
    softAccent: "rgba(245,158,11,0.14)",
    route: "Ranking",
  },
  {
    title: "SETTING",
    subtitle: "Preferences",
    icon: "cog-outline",
    accent: colors.textSecondary,
    softAccent: colors.mode === "light"
      ? "rgba(0,0,0,0.06)"
      : "rgba(255,255,255,0.08)",
    route: "Settings",
  },
];