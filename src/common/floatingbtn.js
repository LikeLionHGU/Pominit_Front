import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Wrapper=styled.div`
 position: fixed;  /* 고정 위치 */
  bottom: 30px;     /* 화면 하단에서 20px 떨어짐 */
  right: 40px;      /* 화면 오른쪽에서 20px 떨어짐 */
  justify-content: center;
  align-items: center;
  cursor: pointer;  
  z-index: 1000;   


display: inline-flex;
padding: 28px 24px;
align-items: center;
gap: 12px;
border-radius: 100px;
background: #FFECF1;
box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.12);
color: #FF517E;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */
`;

const FloatingButton = () => {
    const navigate = useNavigate(); 
  
    const goToSearch = () => {
      navigate("/compare"); 
    };
  
    const location = useLocation();
  
    if (location.pathname === "/") {
      return null; 
    }
  
    return (
      <Wrapper>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <rect y="24.7764" width="24" height="24" rx="12" transform="rotate(-90 0 24.7764)" fill="#FF658C"/>
  <path d="M14 7.77637L9 12.7764L14 17.7764" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> 비교함
      </Wrapper>
    );
  };
  
  export default FloatingButton;