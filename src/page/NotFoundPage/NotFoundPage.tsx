import type { FC } from "react";
import { Link } from "react-router-dom";

import s from "./index.module.css";

const NotFoundPage: FC = () => {
  return (
    <main className={s.page}>
      <div className={s.content}>
        <p className={s.code}>404</p>

        <h1 className={s.title}>Сторінку не знайдено</h1>

        <p className={s.description}>Сторінка, яку ви шукаєте, не існує або була переміщена.</p>

        <Link className={s.link} to="/">
          Повернутися на головну
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
