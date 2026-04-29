import i18n from "../i18n";

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
    title: i18n.t("menu_solo_title"),
    subtitle: i18n.t("menu_solo_subtitle"),
    icon: "book-open-variant",
    accent: colors.primary,
    softAccent: colors.primarySoft,
    route: "ThemeSelection",
  },
  {
    title: i18n.t("menu_duo_title"),
    subtitle: i18n.t("menu_duo_subtitle"),
    icon: "account-group",
    accent: colors.secondary,
    softAccent: colors.secondarySoft,
    route: "Multiplayer",
  },
  {
    title: i18n.t("menu_team_title"),
    subtitle: i18n.t("menu_team_subtitle"),
    icon: "account-multiple-plus",
    accent: colors.accent,
    softAccent: "rgba(255,107,107,0.14)",
    route: "TeamQuiz",
  },
  {
    title: i18n.t("menu_image_title"),
    subtitle: i18n.t("menu_image_subtitle"),
    icon: "image-multiple-outline",
    accent: "#0EA5E9",
    softAccent: "rgba(14,165,233,0.14)",
    route: "ImageQuizMode",
  },
  {
    title: i18n.t("menu_bible_title"),
    subtitle: i18n.t("menu_bible_subtitle"),
    icon: "book-outline",
    accent: colors.primary,
    softAccent: colors.primarySoft,
    route: "Bible",
  },
  {
    title: i18n.t("menu_verse_title"),
    subtitle: i18n.t("menu_verse_subtitle"),
    icon: "script-text-outline",
    accent: "#8B5CF6",
    softAccent: "rgba(139,92,246,0.14)",
    route: "VerseOfDay",
  },
  {
    title: i18n.t("menu_ranking_title"),
    subtitle: i18n.t("menu_ranking_subtitle"),
    icon: "trophy-outline",
    accent: colors.secondary,
    softAccent: colors.secondarySoft,
    route: "Ranking",
  },
  {
    title: i18n.t("menu_settings_title"),
    subtitle: i18n.t("menu_settings_subtitle"),
    icon: "cog-outline",
    accent: colors.textSecondary,
    softAccent: colors.mode === "light"
      ? "rgba(0,0,0,0.06)"
      : "rgba(255,255,255,0.08)",
    route: "Settings",
  },
];