import styled from "styled-components";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LogoWrapper = styled.div`
  padding-top: 17px;
  padding-left: 0px;
`;

// ✅ $blue 프롭으로 보더 색 분기
const Loginbtn = styled.div`
  display: inline-flex;
  position: absolute;
  top: 11px;
  left: 988px;
  padding: 8px 12px;
  gap: 10px;
  justify-content: center;
  align-items: center;

  border-radius: 6px;
  border: 1px solid
    ${({ $blue }) =>
      $blue ? "#2F83F3" : "var(--Foundation-main-blue-50, #EAF3FE)"};
  cursor: pointer;
  caret-color: transparent;

  &:hover {
    background: ${({ $blue }) => ($blue ? "#F5F8FF" : "transparent")};
  }
`;

// ✅ $blue 프롭으로 글자 색 분기
const Login = styled.div`
  color: ${({ $blue }) =>
    $blue ? "#2F83F3" : "var(--Foundation-main-blue-50, #EAF3FE)"};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
`;

const Logo = styled.svg`
  color: ${({ $blue }) => ($blue ? "#336DFF" : "#FFFFFF")};
  cursor: pointer;
`;

const BLUE_PATTERNS = ["/detail/*", "/compare/*"];

function isOneOf(pathname, patterns) {
  return patterns.some((p) =>
    matchPath({ path: p, end: !p.endsWith("/*") }, pathname)
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isBlueLogo = isOneOf(pathname, BLUE_PATTERNS);

  // ✅ 홈('/')만 제외하고 버튼을 파란 테마로
  const isBlueBtn = pathname !== "/";

  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthed(Boolean(token));
    const onStorage = () => {
      const t = localStorage.getItem("token");
      setIsAuthed(Boolean(t));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.put(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (e) {
      // 무시
    } finally {
      localStorage.removeItem("token");
      setIsAuthed(false);
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div>
      <LogoWrapper>
        <Logo
          $blue={isBlueLogo}
          width="87"
          height="18"
          viewBox="0 0 87 18"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="씨즐 로고"
          onClick={() => navigate("/")}
        >
          <g fill="currentColor">
            <path d="M8.54 17C5.58 17 2.48 16.24 0.4 15.12C1.18 14.1 2.14 12.42 2.38 11.2C4.78 12.3 7.12 12.84 8.86 12.84C10.56 12.84 11.68 12.32 11.7 11.34C11.72 10.38 10.52 10.04 8.42 9.98C3.72 9.84 0.96 8.8 1.08 5.36C1.18 2.22 3.88 0.48 8.1 0.48C10.4 0.48 13.16 0.96 16.2 2C15.58 3.12 14.94 5 14.9 6.24C12.22 5.12 10.26 4.72 8.9 4.72C7.16 4.72 6.4 5.38 6.36 6.08C6.3 7.18 7.4 7.56 9.22 7.6C14.3 7.72 17.02 8.8 16.96 11.68C16.88 15.62 12.86 17 8.54 17ZM25.9633 17.02C22.3233 17.02 18.5433 16 17.9833 11.78C17.6233 7.22 20.9033 5.38 25.1233 5.38C28.0033 5.38 31.5233 6.64 31.5233 9.14C31.5233 11.68 28.7833 12.64 26.3233 12.64C25.2433 12.64 23.5233 12.42 22.7833 11.64L22.8033 11.98C22.9033 13.54 24.5433 13.94 25.8233 13.94C27.3433 13.94 28.4633 13.34 29.2033 12.5C29.8033 13.12 31.3233 14.2 32.3033 14.54C30.4633 16.68 27.9833 17.02 25.9633 17.02ZM22.6233 9.66C22.6233 10.72 23.4833 11.28 24.5433 11.28C25.6033 11.28 26.4633 10.72 26.4633 9.66C26.4633 8.6 25.6033 8.02 24.5433 8.02C23.4833 8.02 22.6233 8.6 22.6233 9.66ZM37.8633 17C35.4033 17 32.8033 15.94 32.8033 13.34C32.8033 10.62 35.8033 9.94 37.9833 9.94C39.7833 9.94 41.4833 10.38 42.0833 10.94C42.0633 10.6 42.0233 10.26 41.9633 9.92C41.7833 9.1 39.5433 8.88 38.7633 8.88C37.5833 8.88 36.1633 9.1 34.6633 9.64C34.6433 8.78 34.1833 6.9 33.7633 6.1C35.3233 5.62 37.1833 5.38 39.0233 5.38H39.2433C43.2433 5.44 47.0833 6.74 46.9433 9.52C46.8233 11.96 46.7433 14.2 47.1233 16.6H41.4833C41.6233 16.34 41.7433 16.02 41.8433 15.74C41.1433 16.54 39.5433 17 37.8633 17ZM37.8633 13.3C37.8633 14.48 38.9833 14.94 40.0433 14.94C41.1033 14.94 42.2233 14.48 42.2233 13.3C42.2233 12.12 41.1033 11.68 40.0433 11.68C38.9833 11.68 37.8633 12.12 37.8633 13.3ZM48.7697 11.54L58.1497 5.28H48.7697C48.9297 3.96 48.9297 2.2 48.7697 0.879999H63.0897V5.28L53.3097 11.9L55.9697 11.94C58.6697 11.94 61.3697 11.8 63.4897 11.54C63.2497 13.12 63.2497 15.02 63.4897 16.6H48.7697V11.54ZM65.1359 16.6C65.5359 12.82 65.5359 4.66 65.1359 0.899999H70.7759C70.3359 4.66 70.3359 12.82 70.7759 16.6H65.1359ZM80.182 17.02C76.542 17.02 72.762 16 72.202 11.78C71.842 7.22 75.122 5.38 79.342 5.38C82.222 5.38 85.742 6.64 85.742 9.14C85.742 11.68 83.002 12.64 80.542 12.64C79.462 12.64 77.742 12.42 77.002 11.64L77.022 11.98C77.122 13.54 78.762 13.94 80.042 13.94C81.562 13.94 82.682 13.34 83.422 12.5C84.022 13.12 85.542 14.2 86.522 14.54C84.682 16.68 82.202 17.02 80.182 17.02ZM76.842 9.66C76.842 10.72 77.702 11.28 78.762 11.28C79.822 11.28 80.682 10.72 80.682 9.66C80.682 8.6 79.822 8.02 78.762 8.02C77.702 8.02 76.842 8.6 76.842 9.66Z" />
          </g>
        </Logo>
      </LogoWrapper>

      {pathname !== "/signup" && (
        <Loginbtn
          $blue={isBlueBtn}
          onClick={isAuthed ? handleLogout : () => navigate("/login")}
          aria-label={isAuthed ? "로그아웃" : "로그인"}
        >
          <Login $blue={isBlueBtn}>{isAuthed ? "로그아웃" : "로그인"}</Login>
        </Loginbtn>
      )}
    </div>
  );
}
