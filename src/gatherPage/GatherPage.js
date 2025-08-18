//import React, { Component } from "react";
import styles from "./styles/GatherPage.module.css";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

import Dropdown from "./component/Dropdown";
import GatherList from "./component/GatherList";

function GatherPage() {
  return (
    <div>
      <Header />
      <div className={styles.wrap}>
        <Sidebar />
        <div className={styles.container}>
          <div className={styles.topDrops}>
            <Dropdown
              defaultValue="포항 레포츠 종류"
              options={["전체", "서핑", "카약", "요트"]}
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
