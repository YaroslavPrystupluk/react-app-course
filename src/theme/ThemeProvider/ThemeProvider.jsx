import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import {THEME_LOCAL_STORAGE} from "../../constants";

export const ThemeProvider = ({ children }) => {
  const currentTheme = localStorage.getItem(THEME_LOCAL_STORAGE) || "light" ;
  console.log(currentTheme)
  const [theme, setTheme] = useState(currentTheme);
  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};
