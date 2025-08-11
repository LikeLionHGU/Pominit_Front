import styled from "styled-components";

const Wrapper = styled.div`
 display: grid;
  grid-template-columns: repeat(3, minmax(140px, 1fr)); 
  column-gap: 12px; 
  row-gap: 16px;  
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.12);
  background: #c5c5c5;
`;
const Item = styled.div`
display: flex;
 justify-content: center;
  align-items: center;
padding: 12px 16px;
align-items: left;
gap: 6px;
border-radius: 100px;
background: #C5C5C5;
border: 1px solid black;

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
