import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./page/HomePage";
import { NotFoundPage } from "./page/NotFoundPage";
import { QuestionPage } from "./page/QuestionPage";
import { AddQuestionPageLazy } from "./page/AddQuestionPage";
import { EditQuestionPageLazy } from "./page/EditQuestionPage";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { ForbiddenPage } from "./page/ForbiddenPage";

const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  const lacation = useLocation();

  return isAuth ? <Outlet /> : <Navigate to="/forbidden" state={{ from: lacation.pathname }} replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/question/:id" element={<QuestionPage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/addquestion" element={<AddQuestionPageLazy />} />
              <Route path="/editquestion/:id" element={<EditQuestionPageLazy />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
