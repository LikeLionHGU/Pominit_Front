import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import CenterDetailPage from "./centerdetailPage/CenterDetailPage";
import GatherPage from "./joinPage/GatherPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<CenterDetailPage />} />
        <Route path="/gather/:id" element={<GatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
