import React from "react";
import styles from "./styles/Modal.module.css";

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  const renderWithLineBreaks = (content) => {
    if (typeof content === "string") {
      return content.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
    }
    return content;
  };

  return (
    <div onClick={onClose} className={styles.modal_overlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.modal} ${className || ""}`}
        tabIndex={0}
      >
        {renderWithLineBreaks(children)}
      </div>
    </div>
  );
};

export default Modal;
