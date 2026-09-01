import { memo, type FC, type ReactNode } from "react";

import s from "./index.module.css";

type Props = {
  onClick: () => void;
  isActive?: boolean;
  isDisabled: boolean;
  children: ReactNode;
};

const Button: FC<Props> = memo(({ onClick, isActive, isDisabled, children }) => {
  return (
    <button className={`${s.btn} ${isActive ? s.active : ""}`} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
});
export default Button;
