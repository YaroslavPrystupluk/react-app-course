import { useLayoutEffect, useState, type FC, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import { THEME_LOCAL_STORAGE } from "../../constants";
import type { themeSchemaType } from "../../types/global.types";

type Props = {
  children: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const currentTheme = (localStorage.getItem(THEME_LOCAL_STORAGE) as themeSchemaType) || "light";
  const [theme, setTheme] = useState<themeSchemaType>(currentTheme);
  useLayoutEffect(() => {
    const detectTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        setTheme("dark");
        document.body.classList.remove("darkLayout");
      } else {
        currentTheme === "dark" && document.body.classList.add("darkLayout");
        setTheme(currentTheme);
      }
    };
    detectTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", detectTheme);

    return () => mediaQuery.removeEventListener("change", detectTheme);
  }, []);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};
