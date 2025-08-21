// Floating.jsx
import React from "react";
import styles from "./Floating.module.css";

function Floating() {
  return (
    <div className={styles.floatingBar}>
      <div className={styles.floatingInner}>
        <button className={styles.submit}>신청하기</button>
      </div>
    </div>
  );
}

export default Floating;
