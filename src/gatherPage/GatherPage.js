// GatherPage.jsx
import React, { useState } from "react";
import styles from "./styles/GatherPage.module.css";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Dropdown from "../common/Dropdown";
import GatherList from "./component/List";
import Calendar from "../common/Calendar/Calendar";
import Footer from "../common/Footer";

import "../index.css";

function GatherPage() {
  const [sport, setSport] = useState(""); // 카테고리(스포츠)
  const [date, setDate] = useState(""); // yyyy-MM-dd

  return (
    <>
      <div className="container">
        <Header />
        <div className={styles.wrap}>
          <Sidebar />
          <div className={styles.container}>
            <div className={styles.topDrops}>
              <Dropdown
                defaultValue="포항 레포츠 종류"
                options={[
                  "전체",
                  "요트",
                  "딩기요트",
                  "서핑/윈드서핑",
                  "스킨스쿠버",
                  "프리다이빙",
                  "스노쿨링",
                  "카약/카누",
                  "조정",
                ]}
                onSelect={(val) =>
                  setSport(
                    val === "전체" ? "" : val?.split("/")?.[0] || val || ""
                  )
                }
                onChange={(val) =>
                  setSport(
                    val === "전체" ? "" : val?.split("/")?.[0] || val || ""
                  )
                }
              />
              <Calendar
                onDateChange={(val) => {
                  console.log("picked:", val);
                  setDate(val);
                }}
              />
            </div>

            <div className={styles.gathers}>
              <div className={styles.gatherTop}>이런 모임은 어때요?</div>
              <div className={styles.gatherList}>
                <GatherList category={sport} date={date || "모임일자"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default GatherPage;
