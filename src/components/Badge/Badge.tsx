import type { FC, ReactNode } from "react";
import s from "./index.module.css";
import type { LevelVariantType } from "../../types/global.types";

type Props = {
  variant: LevelVariantType;
  children: ReactNode;
};

const Badge: FC<Props> = ({ variant, children }) => {
  switch (variant) {
    case "primary":
      return <div className={`${s.badge} ${s.primary}`}>{children}</div>;
    case "success":
      return <div className={`${s.badge} ${s.success}`}>{children}</div>;
    case "warning":
      return <div className={`${s.badge} ${s.warning}`}>{children}</div>;
    case "alert":
      return <div className={`${s.badge} ${s.alert}`}>{children}</div>;
    default:
      return <div className={s.badge}>{children}</div>;
  }
};

export default Badge;
