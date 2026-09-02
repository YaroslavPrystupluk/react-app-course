export const DEFAULT_PER_PAGE = 10;
export const API_URL = import.meta.env.VITE_SERVER_URL;
export const IS_AUTH_LOCAL_STORAGE = "isAuth";
export const THEME_LOCAL_STORAGE = "theme";

export const THEME_TYPE_ENUM = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export const VARIANT_TYPE_ENUM = {
  SUCCESS: "success",
  WARNING: "warning",
  PRIMARY: "primary",
  ALERT: "alert",
} as const;
