import { useUser } from "../context/user";
import { darkColors, lightColors } from "../theme";

export const useAppTheme = () => {
  const { theme } = useUser();

  const colors = theme === "light" ? lightColors : darkColors;
  const isLight = theme === "light";

  return {
    theme,
    colors,
    isLight,
  };
};
