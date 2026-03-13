export const LightColors = {
  primary: "#1A237E", // Navy
  secondary: "#FFD600", // Amber/Gold
  secondaryLight: "#FFEA00", // Bright yellow
  accent: "#4DB6AC", // Beryl Stone (Gems)
  accentLight: "#B2DFDB", // Lighter beryl
  background: "#F8F9FA", // Light grey background
  surface: "#FFFFFF", // White card surface
  text: "#1A237E", // Navy text for readability
  textSecondary: "#5F6368",
  success: "#4CAF50",
  error: "#F44336",
  white: "#FFFFFF",
  black: "#000000",
  gold: "#FFD600",
  beryl: "#4DB6AC",
  border: "#E8EAED",
  navBackground: "#FFFFFF", // White background for light mode
  navText: "#1A237E", // Navy text/icons for light mode
  cardShadow: "rgba(26, 35, 126, 0.1)",
};

export const DarkColors = {
  primary: "#1A237E", // Navy
  secondary: "#FFD600", // Amber/Gold
  secondaryLight: "#FFE082", // Lighter amber for dark mode contrast
  accent: "#4DB6AC", // Beryl Stone (Gems)
  accentLight: "#B2DFDB", // Lighter beryl for dark mode
  background: "#0D1117", // Darker navy for background
  surface: "#1C2128", // Slightly lighter card surface
  text: "#FFFFFF",
  textSecondary: "#90969D",
  success: "#4CAF50",
  error: "#F44336",
  white: "#FFFFFF",
  black: "#000000",
  gold: "#FFD600",
  beryl: "#4DB6AC",
  border: "#30363D",
  navBackground: "#1A237E", // Navy background for dark mode
  navText: "#FFFFFF", // White text/icons for dark mode
  cardShadow: "rgba(0, 0, 0, 0.3)",
};

export const Colors = LightColors; // Default to Light

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: "bold" as const,
  },
  h2: {
    fontSize: 22,
    fontWeight: "bold" as const,
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
  },
};

export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};
