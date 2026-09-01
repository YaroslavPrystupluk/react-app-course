import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import ReactLogo from "../../assets/react.svg";
import { useAuth } from "../../hooks/useAuth";
import { IS_AUTH_LOCAL_STORAGE } from "../../constants/global.constants";
import { ThemeToggler } from "../../feature/ThemeToggler";

import s from "./index.module.css";

const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useAuth();

  const loginHandler = () => {
    localStorage.setItem(IS_AUTH_LOCAL_STORAGE, !isAuth);
    setIsAuth(!isAuth);
  };

  return (
    <header className={s.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="logo react" />
        <span>ReactCards</span>
      </p>
      <div className={s.headerButtons}>
        <ThemeToggler />
        {isAuth && <Button onClick={() => navigate("/addquestion")}>Add</Button>}
        <Button onClick={loginHandler} isActive={!isAuth}>
          {isAuth ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
