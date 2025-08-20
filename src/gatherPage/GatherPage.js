//import React, { Component } from "react";
import styles from "./styles/GatherPage.module.css";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

import Dropdown from "../common/Dropdown";
import GatherList from "./component/List";
import "../index.css";

function GatherPage() {
  return (
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
            />
          </div>
          <div className={styles.gathers}>
            <div className={styles.gatherTop}>이런 모임은 어때요?</div>
            <div className={styles.gatherList}>
              <GatherList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GatherPage;
