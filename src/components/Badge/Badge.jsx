import s from "./index.module.css";

const Badge = ({ variant, children }) => {
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
