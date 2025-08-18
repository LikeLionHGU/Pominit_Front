import React from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

function GatherDetail() {
  return (
    <div>
      <Header />
      <div className={styles.wrap}>
        <Sidebar />
      </div>
    </div>
  );
}

export default GatherDetail;
