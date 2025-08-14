import styled from "styled-components";

const SidebarWrapper = styled.div`
  position: absolute; 
  top:83.45px;
  display: flex;
  flex-direction: column;          
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 140px;
  padding: 8px;
  border-radius: 6px;
  background: #C5C5C5;
  border: none;
  cursor: pointer;
  margin-bottom:5.72px;
   &:last-of-type {
    margin-bottom: 24px;
`;

const Banner = styled.div`
width: 140px;
height: 260px;
flex-shrink: 0;
border-radius: 12px;
background: #C5C5C5;
`

export default function Sidebar() {
  return (
    <div>
          <SidebarWrapper>
      <Btn>홈</Btn>
      <Btn>모임</Btn>
      <Btn>챌린지(공사중)</Btn>
      <Btn>마이페이지</Btn>
<Banner/>
    </SidebarWrapper>
    </div>
  
  );
}
