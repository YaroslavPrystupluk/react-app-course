import { createContext } from "react";
import type { ThemeContextType } from "../../types/global.types";

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});
