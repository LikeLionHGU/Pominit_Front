import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import CenterDetailPage from "./centerdetailPage/CenterDetailPage";
import ComparePage from "./comparePage/ComparePage";
import SignupPage from "./signupPage/SignupPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} /> 
        <Route path="/detail/:id" element={<CenterDetailPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
