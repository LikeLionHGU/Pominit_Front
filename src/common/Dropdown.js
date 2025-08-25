import React, { useRef, useState } from "react";
import styles from "./styles/Dropdown.module.css";
import useDetectClose from "../gatherPage/component/useDetectClose";
import down from "../asset/img/down.svg";

function Dropdown({ defaultValue, options, onChange, onSelect }) {
  const dropDownRef = useRef();
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef);

  const handleSelect = (option) => {
    setValue(option);
    onChange?.(option);
    onSelect?.(option);
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
        {"  "}
        <img
          src={down}
          alt="down"
          className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
        />
      </span>

      <ul className={`${styles.optionList} ${isOpen ? styles.open : ""}`}>
        {options.map((option, index) => (
          <li
            key={index}
            className={styles.optionItem}
            onClick={(e) => {
              e.stopPropagation();
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
