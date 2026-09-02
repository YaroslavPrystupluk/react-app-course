import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeProvider";
import type { ThemeContextType } from "../types/global.types";

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};
