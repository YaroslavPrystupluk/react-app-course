import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<p>Home</p>} />
          <Route path="/addquestion" element={<p>"addquestion"</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
