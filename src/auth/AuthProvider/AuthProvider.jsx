import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { IS_AUTH_LOCAL_STORAGE } from "../../constants";

export const AuthProvider = ({ children }) => {
  const isLogin = JSON.parse(localStorage.getItem(IS_AUTH_LOCAL_STORAGE));
  const [isAuth, setIsAuth] = useState(isLogin || false);

  return <AuthContext value={{ isAuth, setIsAuth }}>{children}</AuthContext>;
};
