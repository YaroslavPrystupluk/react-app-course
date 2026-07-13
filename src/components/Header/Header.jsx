import {} from "react";
import ReactLogo from "../../assets/react.svg";

import s from "./index.module.css";
import { generatePath, useNavigate } from "react-router-dom";
import { Button } from "../Button";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={s.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="logo react" />
        <span>ReactCards</span>
      </p>
      <div className={s.headerButtons}>
        <Button onClick={() => navigate("/addquestion")}>Add</Button>
        <Button>Login</Button>
      </div>
    </header>
  );
};

export default Header;
