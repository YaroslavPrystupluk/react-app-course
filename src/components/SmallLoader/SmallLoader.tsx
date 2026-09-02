import type { FC } from "react";
import s from "./index.module.css";

const SmallLoader: FC = () => {
  return <span className={s.spinner}></span>;
};

export default SmallLoader;
