import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data/gather.json";

import styles from "./GatherList.module.css";

import Date from "../../asset/img/date.svg";
import Location from "../../asset/img/location.svg";
import Member from "../../asset/img/member.svg";
import Arrow from "../../asset/img/>>>.svg";

function GatherList() {
  const [lists, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setList(data);
  }, []);
  return (
    <div>
      {lists.map((list, idx) => (
        <div
          className={styles.card}
          key={idx}
          onClick={() => navigate(`/gather/${idx}`)}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.left}>
            <div className={styles.cathegory}>{list["카테고리"]}</div>
            <div className={styles.title}>{list["모집 제목"]}</div>
          </div>
          <div className={styles.right}>
            <div className={styles.row}>
              <span className={styles.content}>
                <img src={Date} alt="icon" className={styles.icon} />
                {list["날짜"]}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.content}>
                <img src={Location} alt="icon" className={styles.icon} />
                {list["강습소 이름"]}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.content}>
                <img
                  src={Member}
                  alt="icon"
                  className={styles.icon}
                  style={{
                    width: "11px",
                    marginRight: "11px",
                    marginLeft: "2px",
                  }}
                />
                {list["현재 신청 인원"]}/{list["총 멤버"]}명
              </span>
            </div>
            <div className={styles.joinBtn}>
              <span>
                모임 참여하기 <img src={Arrow} alt="icon" />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GatherList;
