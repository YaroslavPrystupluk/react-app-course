import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./page/HomePage";
import { NotFoundPage } from "./page/NotFoundPage";
import { QuestionPage } from "./page/QuestionPage";
import { AddQuestionPageLazy } from "./page/AddQuestionPage";
import { EditQuestionPage } from "./page/EditQuestionPage";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="forbidden" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/question/:id" element={<QuestionPage />} />
            <Route path="/forbidden" element={<p>forbidden!!!</p>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/addquestion" element={<AddQuestionPageLazy />} />
              <Route path="/editquestion/:id" element={<EditQuestionPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
