import styled from "styled-components";

const Wrapper = styled.header`
  position: absolute;  
  top: 0; left: 0; right: 0;
  height: 60px;
  width: 100%;     
  z-index: 10;
  background: rgba(0,128,255,.2); /* 테스트용 */
  border-radius: 0 0 12px 12px;
  display:flex; align-items:center; justify-content:center;
`;

export default function Header(){ return <Wrapper>헤더</Wrapper>; }
