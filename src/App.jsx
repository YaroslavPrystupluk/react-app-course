import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import {HomePage} from "./page/HomePage/index.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage/>} />
          <Route path="/addquestion" element={<p>"addquestion"</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
