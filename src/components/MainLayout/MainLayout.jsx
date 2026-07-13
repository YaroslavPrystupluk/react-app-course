import { Outlet } from "react-router-dom";

import s from "./index.module.css";
import { Header } from "../Header";

const MainLayout = () => {
  const year = new Date().getFullYear();

  return (
    <div className={s.mainLayout}>
      <Header />
      <div className={s.mainWrapper}>
        <main className={s.main}>
          <Outlet />
        </main>
        <footer className={s.footer}>
          <span>React Question Cards Application | {year}</span>
          <span>by Yaroslav Prystupliuk</span>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
