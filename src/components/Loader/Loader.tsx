import type { FC } from "react";

import s from "./index.module.css";

const Loader: FC = () => {
  return (
    <div className={s.backdrop}>
      <span className={s.loader}></span>;
    </div>
  );
};

export default Loader;
