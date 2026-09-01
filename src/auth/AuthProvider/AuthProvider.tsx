import { useState, type FC, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { IS_AUTH_LOCAL_STORAGE } from "../../constants/global.constants";

export type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const isLogin = JSON.parse(localStorage.getItem(IS_AUTH_LOCAL_STORAGE) || "false");
  const [isAuth, setIsAuth] = useState<boolean>(isLogin);

  return <AuthContext value={{ isAuth, setIsAuth }}>{children}</AuthContext>;
};
