import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import styles from "./styles/GatherPage.module.css";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

import Dropdown from "../common/Dropdown";
import GatherList from "./component/List";
import "../index.css";

function GatherPage() {
  const [gathers, setGathers] = useState([]);
  const [sport, setSport] = useState(""); // "서핑" 등, 미선택이면 ""
  const [date, setDate] = useState(""); // "yyyy-MM-dd", 미선택이면 ""

  const fetchGathers = useCallback(async () => {
    try {
      const payload = { sport: sport || "", date: date || "" };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/home/gather/list`,
        payload
      );
      setGathers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("[GatherPage] API 연결 실패:", e);
      // 실패 시 데이터는 그냥 빈 상태로 두고 화면은 그대로
      setGathers([]);
    }
  }, [process.env.REACT_APP_API_BASE_URL, sport, date]);

  useEffect(() => {
    fetchGathers();
  }, [fetchGathers]);

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
            {/* 날짜 선택 UI 생기면 setDate('yyyy-MM-dd') 추가 */}
          </div>

          <div className={styles.gathers}>
            <div className={styles.gatherTop}>이런 모임은 어때요?</div>
            <div className={styles.gatherList}>
              <GatherList lists={gathers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GatherPage;
