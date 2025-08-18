import styled from "styled-components";

const Wrapper = styled.div`
 display: grid;
  grid-template-columns: repeat(3, minmax(140px, 1fr)); 
  column-gap: 12px; 
  row-gap: 16px;  
  padding: 16px;
 border-radius: 12px;
background: #FFF;
box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.15);
`;
const Item = styled.div`
user-select: none;     
color: #2F83F3;
display: flex;
 justify-content: center;
  align-items: center;
padding: 12px 16px;
align-items: left;
gap: 6px;

border: 1px solid transparent;
border-radius: 100px;
background: ;
border-radius: 100px;

 &:hover {
    border-color: #2F83F3;
     cursor: pointer;
  }

  &:active {
    background: #2F83F3;
    color:white;
  }

  font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */

`
export default function dropbox() {
  return (<div>
      <Wrapper>
        <Item>스쿠버 다이빙</Item>
        <Item>스쿠버 다이빙</Item>
        <Item>스쿠버 다이빙</Item>
        <Item>스쿠버 다이빙</Item>
        <Item>스쿠버 다이빙</Item>
        <Item>스쿠버 다이빙</Item>
        <Item>스쿠버 다이빙</Item>
        <Item>스쿠버 다이빙</Item>
        <Item>스쿠버 다이빙</Item>
      </Wrapper>
  </div>
  

  );
}
