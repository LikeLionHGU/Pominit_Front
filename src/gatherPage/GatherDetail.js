import React from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

import Info from "./component/Info";
import Member from "./component/Member";
import Review from "./component/Review";

import styles from "./styles/GatherDetail.module.css";

function GatherDetail() {
  return (
    <div className="container">
      <Header />
      <div className={styles.wrap}>
        <Sidebar />
        <div className={styles.container}>
          <Info />
          <Member />
          <Review />
        </div>
      </div>
    </div>
  );
}

export default GatherDetail;
