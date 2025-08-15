import React, { useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import useDetectClose from "./useDetectClose";
import down from "../../asset/img/down.svg";

/*dropdown 사용법
    1. 원하는 페이지에 
    <Dropdown
        defaultValue=""
        options={["", "", "", ""]}
    />
    붙여 넣는다.
    2. defaultValue에는 기본으로 띄워지는 것을 넣는다.
    3. options에는 아래 들어갈 항목을 넣는다
    4. 끗
*/
function Dropdown({ defaultValue, options }) {
  const dropDownRef = useRef();
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef);

  const handleSelect = (option) => {
    setValue(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropDownRef}
      className={`${styles.selectBox} ${isOpen ? styles.open : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className={styles.selected}>
        {value}
        <img
          src={down}
          alt="down"
          className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
        />
      </span>

      <ul className={styles.optionList}>
        {options.map((option, index) => (
          <li
            key={index}
            className={styles.optionItem}
            onClick={(e) => {
              e.stopPropagation(); // 클릭 시 이벤트 버블 방지
              handleSelect(option);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
