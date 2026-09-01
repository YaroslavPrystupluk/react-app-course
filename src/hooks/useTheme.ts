import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeProvider";
import type { ThemeContextType } from "../theme/ThemeProvider/ThemeContext";

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};
