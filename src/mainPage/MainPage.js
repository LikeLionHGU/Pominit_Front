import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Testpage from "../testPage/TestPage";
import Typebtn from "./component/typebtn";
export default function MainPage() {
  return (
    <div className="container">
      <Header />
      <Sidebar />
      <Typebtn/>
       
    </div>
  );
}
