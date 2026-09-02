import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { ToastContainer } from "react-toastify";
import { Suspense, type FC } from "react";
import { Loader } from "../Loader";

import s from "./index.module.css";

const MainLayout: FC = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className={s.mainLayout}>
        <Header />
        <div className={s.mainWrapper}>
          <main className={s.main}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </main>
          <footer className={s.footer}>
            <span>React Question Cards Application | {year}</span>
            <span>by Yaroslav Prystupliuk</span>
          </footer>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default MainLayout;
