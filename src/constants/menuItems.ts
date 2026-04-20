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
    accent: "#0EA5E9",
    softAccent: "rgba(14,165,233,0.14)",
    route: "ImageQuiz",
  },
  {
    title: "BIBLE",
    subtitle: "Vakio ny Baiboly",
    icon: "book-outline",
    accent: colors.primary,
    softAccent: colors.primarySoft,
    route: "Bible",
  },
  {
    title: "VERS DU JOUR",
    subtitle: "Teny fampaherezana",
    icon: "script-text-outline",
    accent: "#8B5CF6",
    softAccent: "rgba(139,92,246,0.14)",
    route: "VerseOfDay",
  },
  {
    title: "RANKING",
    subtitle: "Global standing",
    icon: "trophy-outline",
    accent: colors.secondary,
    softAccent: colors.secondarySoft,
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