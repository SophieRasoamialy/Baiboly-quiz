export interface HomeMenuItem {
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
  softAccent: string;
  route: string;
  bgImage?: any;
}

export const getHomeMenuItems = (colors: any): HomeMenuItem[] => [
  {
    title: "SOLO",
    subtitle: "Milalaova irery",
    icon: "book-open-variant",
    accent: colors.primary,
    softAccent: colors.primarySoft,
    route: "ThemeSelection",
    bgImage: require("../../assets/menu/menu_solo.png"),
  },
  {
    title: "DUO",
    subtitle: "Mifaninana amin'ny namana",
    icon: "account-group",
    accent: colors.secondary,
    softAccent: colors.secondarySoft,
    route: "Multiplayer",
    bgImage: require("../../assets/menu/menu_duo.png"),
  },
  {
    title: "LALAO TENY TELO",
    subtitle: "Mifaninana an-ekipa 2 vs 2",
    icon: "account-multiple-plus",
    accent: colors.accent,
    softAccent: "rgba(255,107,107,0.14)",
    route: "TeamQuiz",
    bgImage: require("../../assets/menu/menu_team.png"),
  },
  {
    title: "SARY",
    subtitle: "Fantaro ny sary",
    icon: "image-multiple-outline",
    accent: "#0EA5E9",
    softAccent: "rgba(14,165,233,0.14)",
    route: "ImageQuizMode",
    bgImage: require("../../assets/menu/menu_image.png"),
  },
  {
    title: "BAIBOLY",
    subtitle: "Vakio ny Tenin’Andriamanitra",
    icon: "book-outline",
    accent: colors.primary,
    softAccent: colors.primarySoft,
    route: "Bible",
    bgImage: require("../../assets/menu/menu_bible.png"),
  },
  {
    title: "TENY HO ANAO",
    subtitle: "Tenin'Andriamanitra ho fampaherezana",
    icon: "script-text-outline",
    accent: "#8B5CF6",
    softAccent: "rgba(139,92,246,0.14)",
    route: "VerseOfDay",
    bgImage: require("../../assets/menu/menu_verse.png"),
  },
  {
    title: "LAHARANA",
    subtitle: "Filaharana eo anivon'ny mpilalao",
    icon: "trophy-outline",
    accent: colors.secondary,
    softAccent: colors.secondarySoft,
    route: "Ranking",
    bgImage: require("../../assets/menu/menu_ranking.png"),
  },
  {
    title: "FANOVANA",
    subtitle: "Safidy sy fikirakirana",
    icon: "cog-outline",
    accent: colors.textSecondary,
    softAccent: colors.mode === "light"
      ? "rgba(0,0,0,0.06)"
      : "rgba(255,255,255,0.08)",
    route: "Settings",
  },
];