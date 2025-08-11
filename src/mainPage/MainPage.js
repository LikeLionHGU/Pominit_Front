import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Testpage from "../testPage/TestPage";

export default function MainPage() {
  return (
    <div className="container">
      <Header />
      <Sidebar />
        <Testpage />
    </div>
  );
}
