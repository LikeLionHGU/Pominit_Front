import React, { useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import useDetectClose from "./useDetectClose";

function Dropdown() {
  const dropDownRef = useRef();
  const [value, setValue] = useState("포항 레포츠 종류");

  const [isOpen, setIsOpen] = useDetectClose(dropDownRef);

  return (
    <div
      ref={dropDownRef}
      className={styles.selectBox}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {value}

      {isOpen && (
        <ul className={styles.optionList}>
          <li
            data-content="선택지 1"
            className={styles.optionItem}
            onClick={(e) => {
              setValue(e.target.dataset["content"]);
            }}
          >
            선택지 1
          </li>
          <li
            data-content="선택지 2"
            className={styles.optionItem}
            onClick={(e) => {
              setValue(e.target.dataset["content"]);
            }}
          >
            선택지 2
          </li>
          <li
            data-content="선택지 3"
            className={styles.optionItem}
            onClick={(e) => {
              setValue(e.target.dataset["content"]);
            }}
          >
            선택지 3
          </li>
          <li
            data-content="선택지 4"
            className={styles.optionItem}
            onClick={(e) => {
              setValue(e.target.dataset["content"]);
            }}
          >
            선택지 4
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
