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
          <Dropdown />
        </div>
      </div>
    </div>
  );
}

export default GatherPage;
