import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import CenterDetailPage from "./centerdetailPage/CenterDetailPage";
import GatherPage from "./gatherPage/GatherPage";
import ComparePage from "./comparePage/ComparePage";
import SignupPage from "./signupPage/SignupPage";
import GatherDetail from "./gatherPage/GatherDetail";
import LoginPage from "./loginPage/LoginPage";
import { CompareProvider } from "./common/compareBasket";


function App() {
  return (
    <CompareProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<CenterDetailPage />} />
          <Route path="/gather" element={<GatherPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/gather/detail/:id" element={<GatherDetail />} />
        </Routes>
    
      </BrowserRouter>
    </CompareProvider>
  );
}

export default App;
