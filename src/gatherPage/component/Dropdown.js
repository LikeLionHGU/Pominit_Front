import React, { useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import useDetectClose from "./useDetectClose";
import down from "../../asset/img/down.svg";

function Dropdown({ defaultValue, options }) {
  const dropDownRef = useRef();
  const [value, setValue] = useState(defaultValue);

  const [isOpen, setIsOpen] = useDetectClose(dropDownRef);

  return (
    <div
      ref={dropDownRef}
      className={`${styles.selectBox} ${isOpen ? styles.open : ""}`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <span>
        {value}
        <img src={down} alt="down" />
      </span>

      {isOpen && (
        <ul className={styles.optionList}>
          {options.map((option, index) => (
            <li
              key={index}
              data-content={option}
              className={styles.optionItem}
              onClick={(e) => {
                setValue(e.target.dataset["content"]);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
