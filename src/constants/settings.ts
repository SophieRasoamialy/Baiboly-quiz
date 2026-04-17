export type ThemeMode = "light" | "dark";
export type LanguageCode = "mg" | "fr";

export const THEME_OPTIONS = [
  {
    mode: "light" as ThemeMode,
    icon: "white-balance-sunny",
    label: "Mazava",
    sublabel: "Light",
  },
  {
    mode: "dark" as ThemeMode,
    icon: "moon-waning-crescent",
    label: "Maizina",
    sublabel: "Dark",
  },
];

export const LANGUAGE_OPTIONS = [
  {
    code: "mg" as LanguageCode,
    label: "Malagasy",
  },
  {
    code: "fr" as LanguageCode,
    label: "Français",
  },
];