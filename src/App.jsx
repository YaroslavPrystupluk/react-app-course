import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./page/HomePage";
import { NotFoundPage } from "./page/NotFoundPage";
import { QuestionPage } from "./page/QuestionPage";
import { AddQuestionPage } from "./page/AddQuestionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="/addquestion" element={<AddQuestionPage />} />
          <Route path="/editquestion/:id" element={<p>"editquestion"</p>} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
