import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

import s from "./index.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const ForbiddenPage = () => {
  const navigate = useNavigate();
  const lacation = useLocation();
  const { isAuth } = useAuth();

  useEffect(() => {
    isAuth && navigate(lacation.state?.from, { replace: true });
  }, [isAuth, lacation.state?.from, navigate]);

  return (
    <div className={s.page}>
      <div className={s.content}>
        <div className={s.code}>403</div>
        <h1 className={s.title}>Access Denied</h1>

        <p className={s.description}>
          You do not have permission to view this page. If you believe this is a mistake, please contact your administrator.
        </p>

        <div className={s.actions}>
          <Button size="large" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
