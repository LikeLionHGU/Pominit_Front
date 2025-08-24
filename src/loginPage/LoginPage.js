import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Bg from "../common/signupbg";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Logo = styled.div`
  padding-top: 17px;
  padding-left: 0px;
`;
const Page = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #e9f4ff 0%, #e9f4ff 100%);
  position: relative;
  min-height: 100vh;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  user-select: none;
`;

const Box = styled.div`
  position: absolute;
  left: 290px;
  top: 150.5px;

  display: inline-flex;
  padding: 24px;
  flex-direction: column;

  border-radius: 12px;
  background: var(--BG-02, #fff);
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);

  height: 429px;
  width: 478px;

  text-align: left;
`;
const Signup = styled.div`
  color: #2f83f3;
  text-align: center;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-bottom: 26px;
`;
const Id = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-bottom: 5.5px;
`;

const Bar = styled.input`
  display: flex;
  width: 430px;
  padding: 14px 16px;
  margin-bottom: 20px;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid var(--Foundation-White-white-500, #d9d9d9);
  background: var(--Foundation-White-white-400, #e1e1e1);
  &::placeholder {
    color: #999;
  }
  &:focus {
    outline: none;
  }
`;

const Register = styled.button.attrs({ type: "submit" })`
  color: white;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  justify-content: center;
  display: flex;
  width: 430px;
  padding: 16px;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid var(--Foundation-White-white-500, #d9d9d9);
  background: #2f83f3;
  margin-bottom: 12px;
  cursor: pointer;
`;

const Go = styled.button.attrs({ type: "button" })`
  justify-content: center;
  text-align: center;
  display: flex;
  width: 430px;
  padding: 16px;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid var(--Foundation-main-blue-200, #9fc6f9);
  background: #fafbff;
  color: #2f83f3;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 12px;
  cursor: pointer;
   &:disabled { opacity: .6; cursor: not-allowed; }
`;

const Hr = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  width: 430px;
  height: 1.2px;
  padding: 0 16px;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  background: var(--Foundation-Blue-blue-500, #b0b9c3);
`;
const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/login`;
      const body = {
        username: form.username,
        password: form.password,
      };

      const res = await axios.post(url, body, {
        headers: { "Content-Type": "application/json" },
      });

      const token = res.headers["authorization"];
      console.log(token);
      localStorage.setItem("token", token);

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
  
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page>
      <div className="container">
        <Bg />

        <Logo>
          <svg
            width="87"
            height="18"
            viewBox="0 0 87 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => navigate(`/`)}
          >
            <path
              d="M8.54 17C5.58 17 2.48 16.24 0.4 15.12C1.18 14.1 2.14 12.42 2.38 11.2C4.78 12.3 7.12 12.84 8.86 12.84C10.56 12.84 11.68 12.32 11.7 11.34C11.72 10.38 10.52 10.04 8.42 9.98C3.72 9.84 0.96 8.8 1.08 5.36C1.18 2.22 3.88 0.48 8.1 0.48C10.4 0.48 13.16 0.96 16.2 2C15.58 3.12 14.94 5 14.9 6.24C12.22 5.12 10.26 4.72 8.9 4.72C7.16 4.72 6.4 5.38 6.36 6.08C6.3 7.18 7.4 7.56 9.22 7.6C14.3 7.72 17.02 8.8 16.96 11.68C16.88 15.62 12.86 17 8.54 17ZM25.9633 17.02C22.3233 17.02 18.5433 16 17.9833 11.78C17.6233 7.22 20.9033 5.38 25.1233 5.38C28.0033 5.38 31.5233 6.64 31.5233 9.14C31.5233 11.68 28.7833 12.64 26.3233 12.64C25.2433 12.64 23.5233 12.42 22.7833 11.64L22.8033 11.98C22.9033 13.54 24.5433 13.94 25.8233 13.94C27.3433 13.94 28.4633 13.34 29.2033 12.5C29.8033 13.12 31.3233 14.2 32.3033 14.54C30.4633 16.68 27.9833 17.02 25.9633 17.02ZM22.6233 9.66C22.6233 10.72 23.4833 11.28 24.5433 11.28C25.6033 11.28 26.4633 10.72 26.4633 9.66C26.4633 8.6 25.6033 8.02 24.5433 8.02C23.4833 8.02 22.6233 8.6 22.6233 9.66ZM37.8633 17C35.4033 17 32.8033 15.94 32.8033 13.34C32.8033 10.62 35.8033 9.94 37.9833 9.94C39.7833 9.94 41.4833 10.38 42.0833 10.94C42.0633 10.6 42.0233 10.26 41.9633 9.92C41.7833 9.1 39.5433 8.88 38.7633 8.88C37.5833 8.88 36.1633 9.1 34.6633 9.64C34.6433 8.78 34.1833 6.9 33.7633 6.1C35.3233 5.62 37.1833 5.38 39.0233 5.38H39.2433C43.2433 5.44 47.0833 6.74 46.9433 9.52C46.8233 11.96 46.7433 14.2 47.1233 16.6H41.4833C41.6233 16.34 41.7433 16.02 41.8433 15.74C41.1433 16.54 39.5433 17 37.8633 17ZM37.8633 13.3C37.8633 14.48 38.9833 14.94 40.0433 14.94C41.1033 14.94 42.2233 14.48 42.2233 13.3C42.2233 12.12 41.1033 11.68 40.0433 11.68C38.9833 11.68 37.8633 12.12 37.8633 13.3ZM48.7697 11.54L58.1497 5.28H48.7697C48.9297 3.96 48.9297 2.2 48.7697 0.879999H63.0897V5.28L53.3097 11.9L55.9697 11.94C58.6697 11.94 61.3697 11.8 63.4897 11.54C63.2497 13.12 63.2497 15.02 63.4897 16.6H48.7697V11.54ZM65.1359 16.6C65.5359 12.82 65.5359 4.66 65.1359 0.899999H70.7759C70.3359 4.66 70.3359 12.82 70.7759 16.6H65.1359ZM80.182 17.02C76.542 17.02 72.762 16 72.202 11.78C71.842 7.22 75.122 5.38 79.342 5.38C82.222 5.38 85.742 6.64 85.742 9.14C85.742 11.68 83.002 12.64 80.542 12.64C79.462 12.64 77.742 12.42 77.002 11.64L77.022 11.98C77.122 13.54 78.762 13.94 80.042 13.94C81.562 13.94 82.682 13.34 83.422 12.5C84.022 13.12 85.542 14.2 86.522 14.54C84.682 16.68 82.202 17.02 80.182 17.02ZM76.842 9.66C76.842 10.72 77.702 11.28 78.762 11.28C79.822 11.28 80.682 10.72 80.682 9.66C80.682 8.6 79.822 8.02 78.762 8.02C77.702 8.02 76.842 8.6 76.842 9.66Z"
              fill="#2F83F3"
            />
          </svg>
        </Logo>
        <form onSubmit={onSubmit}>
          <Box>
            <Signup>로그인</Signup>
            <Id>아이디</Id>
            <Bar
              type="text"
              name="username"
              placeholder="아이디를 입력해주세요."
              value={form.username}
              onChange={onChange}
              autoComplete="username"
              required
            />
            <Id>비밀번호</Id>
            <Bar
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={form.password}
              onChange={onChange}
              autoComplete="current-password"
              required
            />
            <Register disabled={loading} autoFocus>
              로그인
            </Register>
            <Hr />
            <Go type="button" onClick={() => navigate("/signup")}>회원가입</Go>
          </Box>
        </form>
      </div>
    </Page>
  );
};

export default LoginPage;
