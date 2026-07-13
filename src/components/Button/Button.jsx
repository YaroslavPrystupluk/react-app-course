import s from "./index.module.css";
import { memo } from "react";

const Button = memo(({ onClick, isActive, isDisabled, children }) => {
  return (
    <button
      className={`${s.btn} ${isActive ? s.active : ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
});
export default Button;
