import { createPortal } from "react-dom";
import styled from "styled-components";
import { useEffect } from "react";

function PriceImageModal({ src, onClose }) {

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="가격표">
    
        <ImgWrap>
          {src ? (
            <img
              src={src}
              alt="가격표 이미지"
              onError={(e) => { e.currentTarget.alt = "이미지를 불러오지 못했습니다."; }}
            />
          ) : (
            <Fallback>이미지를 불러올 수 없어요.</Fallback>
          )}
        </ImgWrap>
      </Sheet>
    </Overlay>,
    document.body
  );
}


const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center; z-index: 3000;
  user-select:none;
`;
const Sheet = styled.div`
  display: flex; flex-direction: column;
   user-select:none;
`;
const ImgWrap = styled.div`
  padding: 12px 12px 16px;
  display: grid; place-items: center;
  overflow: auto;
  img {
    max-width: 100%;
    max-height: 76vh;   
    object-fit: contain;
    display: block;
  }
`;
const Fallback = styled.div`
  color: #6b7280; padding: 40px 20px;
`;

export default PriceImageModal;
