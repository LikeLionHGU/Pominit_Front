import styled from "styled-components";
import { useEffect } from "react";

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;       
  margin-top: 20px; 
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Wrapper = styled.div`
display: inline-flex;
padding: 24px;
flex-direction: column;
align-items: center;
gap: 40px;
border-radius: 12px;
background: #FFF;
box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const Title = styled.h2`
  margin-top:12px;
  margin-bottom:0px;
color: var(--Foundation-main-blue-500, #2F83F3);
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const Content = styled.p`
  margin: 0;
color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const Cancel = styled.div`
flex:1;
display: flex;
width: 184px;
padding: 16px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 6px;
border: 1px solid var(--Foundation-main-blue-200, #9FC6F9);
background: #FFF;

color: var(--Foundation-main-blue-500, #2F83F3);
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const Go =styled.div`
flex:1;
display: flex;
width: 184px;
padding: 16px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 6px;
background: var(--Foundation-main-blue-500, #2F83F3);
`;

export default function Workmodal({ onClose }) {

    useEffect(() => {
      const onKey = (e) => e.key === "Escape" && onClose?.();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
  
    return createPortal(
      <Overlay onClick={onClose}>
        <Wrapper onClick={(e) => e.stopPropagation()}>
  <Title>로그인이 필요해요</Title>
  <Content>로그인하셔야 본 서비스를 이용하실 수 있습니다</Content>

  <ButtonRow>
    <Cancel type="button" onClick={onClose}>취소</Cancel>
    <Go>로그인 하기</Go>
  </ButtonRow>
</Wrapper>

      </Overlay>,
      document.body 
    );
  }
  