import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import type { AuthContextType } from "../auth/AuthProvider/AuthContext";

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
