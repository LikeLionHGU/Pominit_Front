import Header from "../common/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Page = styled.div`

  width: auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #2185E3 0%, #FFF 100%);
  position: relative;
  min-height: 100vh;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
`;

const HeaderWrapper = styled.div`
  width: 1060px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 0 0 12px 12px;
  background: var(--Foundation-White-white-500, #D9D9D9);
`;

const Box=styled.div`
margin-left:290px;
margin-top:90.5px;
height:528px;
width:478px;
display: inline-flex;
padding: 24px;
flex-direction: column;
text-align:left;
border-radius: 12px;
background: white;
box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;
const Signup=styled.div`
color: #000;
text-align: center;
font-family: Pretendard;
font-size: 28px;
font-style: normal;
font-weight: 600;
line-height: normal;
padding-bottom:26px;
`;
const Id=styled.div`
color: #000;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: normal;
padding-bottom:5.5px;
`;

const Bar = styled.input`
display: flex;
width: 430px;
padding: 14px 16px;
margin-bottom:20px;
align-items: center;
gap: 10px;
border-radius: 6px;
border: 1px solid var(--Foundation-White-white-500, #D9D9D9);
background: var(--Foundation-White-white-400, #E1E1E1);
 &::placeholder {
    color: #999;
  }
 &:focus {
    outline: none;
  }
`;

const Register=styled.div`
color: var(--Foundation-White-white-50, #FBFBFB);
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
 justify-content: center; 
  align-items: center; 
display: flex;
width: 430px;
padding: 16px;
align-items: center;
gap: 10px;
border-radius: 6px;
border: 1px solid var(--Foundation-White-white-500, #D9D9D9);
background: var(--Foundation-White-white-700, #9A9A9A);
`;
export default function SurfingCenters() {
    const navigate = useNavigate();
    return (
        <Page>
            <div className="container">
            <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <Box>
            <Signup>회원가입</Signup>
            <Id>아이디</Id>
            <Bar placeholder="아이디를 입력해주세요."/>
            <Id>비밀번호</Id>
            <Bar placeholder="비밀번호를 입력해주세요."/>
            <Id>닉네임</Id>
            <Bar placeholder="15자 이내로 입력해주세요."/>
            <Id>상태메시지</Id>
            <Bar placeholder="해양 레저 스포츠에 임하는 나의 각오는? 본인의 한줄평"/>
            <Register onClick={()=> navigate(`/main`)} style={{ cursor: "pointer" }}>동의하고 가입하기</Register>
        </Box>
        </div> 
        </Page>
       
    );
}