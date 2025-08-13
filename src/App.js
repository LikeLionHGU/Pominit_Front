import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import CenterDetailPage from "./centerdetailPage/CenterDetailPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<CenterDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
