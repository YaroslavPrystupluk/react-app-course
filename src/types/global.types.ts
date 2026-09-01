import type { Dispatch, SetStateAction } from "react";

export type ThemeContextType = {
  theme: themeSchemaType;
  setTheme: Dispatch<SetStateAction<themeSchemaType>>;
};

export type AuthContextType = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const THEME_TYPE = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type themeSchemaType = (typeof THEME_TYPE)[keyof typeof THEME_TYPE];

export type QuestionCardType = {
  id: string;
  question: string;
  answer: string;
  description: string;
  resources: string[];
  level: number;
  completed: boolean;
  editDate?: string;
};
