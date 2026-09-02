import type { Dispatch, SetStateAction } from "react";
import type { THEME_TYPE_ENUM, VARIANT_TYPE_ENUM } from "../constants/global.constants";

export type ThemeContextType = {
  theme: themeSchemaType;
  setTheme: Dispatch<SetStateAction<themeSchemaType>>;
};

export type AuthContextType = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export type themeSchemaType = (typeof THEME_TYPE_ENUM)[keyof typeof THEME_TYPE_ENUM];

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

export type QuestionCardStateType = QuestionCardType & {
  clearForm: boolean;
};

export type LevelVariantType = (typeof VARIANT_TYPE_ENUM)[keyof typeof VARIANT_TYPE_ENUM];
