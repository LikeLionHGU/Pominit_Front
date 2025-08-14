import React, { Component } from "react";
import styles from "./styles/GatherPage.module.css";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

import Dropdown from "./component/Dropdown";

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
            <div className={styles.gatherList}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GatherPage;
