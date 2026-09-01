import { createContext } from "react";
import type { AuthContextType } from "../../types/global.types";

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
});
