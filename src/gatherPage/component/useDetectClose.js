import { useState, useEffect } from "react";

const useDetectClose = (ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isOpen, ref]);

  return [isOpen, setIsOpen];
};

export default useDetectClose;
