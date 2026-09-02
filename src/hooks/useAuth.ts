import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import type { AuthContextType } from "../types/global.types";

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
