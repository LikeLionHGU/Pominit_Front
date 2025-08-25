
import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 360px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
margin-top:20px;
  cursor: pointer;
  width: 100%;
  padding: 14px 16px;
  border-radius: 6px;
  background: #2F83F3;
 color: #FBFBFB;
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
border:none;
`;

export default function ErrorModal({ open, onClose, title, message }) {
  if (!open) return null;
  return (
    <Overlay>
      <ModalBox>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Button onClick={onClose}>확인</Button>
      </ModalBox>
    </Overlay>
  );
}
