import Ball from "../asset/img/ball.svg"
import Ball2 from "../asset/img/ball2.svg";
import Tree1 from "../asset/img/tree1.svg";
import Tree2 from "../asset/img/tree2.svg";
import Chair from "../asset/img/chair.svg";

import styled from "styled-components";

const Ballstyle = styled.div`
 position: absolute;  
  left: 330px;
  opacity: 0.5;
`;
const Ss = styled.div`
 position: absolute;  
 top:78px;
  left: 16px;
`;
const Es = styled.div`
 position: absolute;  
 top:138px;
  left: 225px;
`;
const As = styled.div`
 position: absolute;  
 top:138px;
  left: 408px;
`;
const Zs = styled.div`
 position: absolute;  
 top:90px;
  left: 600px;
`;
const Ls = styled.div`
 position: absolute;  
 top:85px;
  left: 796px;
`;
const E2s = styled.div`
 position: absolute;  
 top:136px;
  left: 880px;
`;
const Tree1s = styled.div`
position: absolute;  
 top:65px;
  left: 320px;
  opacity: 0.5;
`;
const Tree2s = styled.div`
position: absolute;  
 top:10px;
  left: 400px;
  opacity: 0.5;
`;
const Chairs = styled.div`
position: absolute;  
 top:70px;
  left: 520px;
   opacity: 0.5;
`;
const Ball2s = styled.div`
position: absolute;  
 top:198px;
  left: 680px;
  opacity: 0.5;
`;

const Logo=styled.div`
fill: linear-gradient(180deg, #A3CEFF 0%, rgba(163, 206, 255, 0.27) 100%);
`;
export default function MainPage() {
    return (
        <div>
           <Ballstyle><img src={Ball} alt="Ball" /></Ballstyle>
           <Logo>
            <Ss><svg xmlns="http://www.w3.org/2000/svg" width="197" height="196" viewBox="0 0 197 196" fill="none">
  <path d="M96.3694 195.58C61.326 195.58 24.6251 186.583 0 173.323C9.23442 161.247 20.5999 141.358 23.4412 126.914C51.8548 139.937 79.5581 146.33 100.158 146.33C120.284 146.33 133.544 140.174 133.781 128.571C134.017 117.206 119.811 113.181 94.9488 112.47C39.3055 110.813 6.62984 98.5004 8.05052 57.7743C9.23442 20.5998 41.1997 0 91.1603 0C118.39 0 151.066 5.68271 187.056 17.9953C179.716 31.2549 172.139 53.5123 171.665 68.1926C139.937 54.9329 116.732 50.1973 100.631 50.1973C80.0316 50.1973 71.034 58.0111 70.5604 66.2984C69.8501 79.3213 82.873 83.8201 104.42 84.2937C164.562 85.7143 196.764 98.5005 196.054 132.597C195.107 179.242 147.514 195.58 96.3694 195.58Z" fill="url(#paint0_linear_571_959)"/>
  <defs>
    <linearGradient id="paint0_linear_571_959" x1="98.0326" y1="0" x2="98.0326" y2="195.58" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A3CEFF"/>
      <stop offset="1" stop-color="#A3CEFF" stop-opacity="0.27"/>
    </linearGradient>
  </defs>
</svg></Ss>
<Es><svg xmlns="http://www.w3.org/2000/svg" width="171" height="138" viewBox="0 0 171 138" fill="none">
  <path d="M95.6459 137.81C52.5519 137.81 7.80054 125.734 1.1707 75.7735C-3.09134 21.7877 35.7406 0.00390625 85.7011 0.00390625C119.797 0.00390625 161.471 14.921 161.471 44.5185C161.471 74.5896 129.032 85.955 99.9079 85.955C87.1218 85.955 66.7587 83.3504 57.9979 74.116L58.2347 78.1413C59.4186 96.6101 78.8345 101.346 93.9884 101.346C111.984 101.346 125.243 94.2423 134.004 84.2976C141.108 91.6377 159.103 104.424 170.705 108.449C148.921 133.785 119.561 137.81 95.6459 137.81ZM56.1036 50.6748C56.1036 63.2241 66.2852 69.854 78.8345 69.854C91.3838 69.854 101.565 63.2241 101.565 50.6748C101.565 38.1255 91.3838 31.2589 78.8345 31.2589C66.2852 31.2589 56.1036 38.1255 56.1036 50.6748Z" fill="url(#paint0_linear_571_958)"/>
  <defs>
    <linearGradient id="paint0_linear_571_958" x1="85.7779" y1="0.00390625" x2="85.7778" y2="137.81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A3CEFF"/>
      <stop offset="1" stop-color="#A3CEFF" stop-opacity="0.27"/>
    </linearGradient>
  </defs>
</svg></Es>
<As><svg xmlns="http://www.w3.org/2000/svg" width="171" height="138" viewBox="0 0 171 138" fill="none">
  <path d="M60.5284 137.573C31.4044 137.573 0.623047 125.024 0.623047 94.2423C0.623047 62.0402 36.14 53.9897 61.949 53.9897C83.2592 53.9897 103.386 59.1989 110.489 65.8287C110.252 61.8035 109.779 57.7782 109.068 53.7529C106.937 44.045 80.4179 41.4404 71.1835 41.4404C57.2135 41.4404 40.4021 44.045 22.6436 50.438C22.4068 40.2565 16.9609 17.9992 11.9885 8.52799C30.4573 2.84527 52.4779 0.00390625 74.2616 0.00390625H76.8662C124.222 0.714251 169.684 16.1049 168.026 49.0173C166.606 77.9045 165.659 104.424 170.157 132.837H103.386C105.043 129.759 106.464 125.971 107.648 122.656C99.3603 132.127 80.4179 137.573 60.5284 137.573ZM60.5284 93.7687C60.5284 107.739 73.7881 113.185 86.3374 113.185C98.8867 113.185 112.146 107.739 112.146 93.7687C112.146 79.7987 98.8867 74.5896 86.3374 74.5896C73.7881 74.5896 60.5284 79.7987 60.5284 93.7687Z" fill="url(#paint0_linear_571_957)"/>
  <defs>
    <linearGradient id="paint0_linear_571_957" x1="85.3903" y1="0.00390625" x2="85.3903" y2="137.573" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A3CEFF"/>
      <stop offset="1" stop-color="#A3CEFF" stop-opacity="0.27"/>
    </linearGradient>
  </defs>
</svg></As>
<Zs><svg xmlns="http://www.w3.org/2000/svg" width="175" height="187" viewBox="0 0 175 187" fill="none">
  <path d="M0.650391 126.932L111.7 52.8201H0.650391C2.54463 37.1926 2.54463 16.356 0.650391 0.728516H170.185V52.8201L54.3994 131.194L85.8912 131.668C117.856 131.668 149.822 130.01 174.92 126.932C172.079 145.638 172.079 168.132 174.92 186.838H0.650391V126.932Z" fill="url(#paint0_linear_571_956)"/>
  <defs>
    <linearGradient id="paint0_linear_571_956" x1="87.7854" y1="0.728516" x2="87.7854" y2="186.838" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A3CEFF"/>
      <stop offset="1" stop-color="#A3CEFF" stop-opacity="0.27"/>
    </linearGradient>
  </defs>
</svg></Zs>
<Ls><svg xmlns="http://www.w3.org/2000/svg" width="68" height="187" viewBox="0 0 68 187" fill="none">
  <path d="M0.410156 186.843C5.14575 142.092 5.14575 45.4853 0.410156 0.970703H67.1821C61.9729 45.4853 61.9729 142.092 67.1821 186.843H0.410156Z" fill="url(#paint0_linear_571_955)"/>
  <defs>
    <linearGradient id="paint0_linear_571_955" x1="33.7961" y1="0.970703" x2="33.796" y2="186.843" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A3CEFF"/>
      <stop offset="1" stop-color="#A3CEFF" stop-opacity="0.27"/>
    </linearGradient>
  </defs>
</svg></Ls>
<E2s><svg xmlns="http://www.w3.org/2000/svg" width="171" height="138" viewBox="0 0 171 138" fill="none">
  <path d="M95.5413 137.81C52.4474 137.81 7.69605 125.734 1.06621 75.7735C-3.19583 21.7877 35.6361 0.00390625 85.5966 0.00390625C119.693 0.00390625 161.366 14.921 161.366 44.5185C161.366 74.5896 128.927 85.955 99.8034 85.955C87.0173 85.955 66.6542 83.3504 57.8933 74.116L58.1302 78.1413C59.3141 96.6101 78.73 101.346 93.8839 101.346C111.879 101.346 125.139 94.2423 133.9 84.2976C141.003 91.6377 158.998 104.424 170.601 108.449C148.817 133.785 119.456 137.81 95.5413 137.81ZM55.9991 50.6748C55.9991 63.2241 66.1806 69.854 78.73 69.854C91.2793 69.854 101.461 63.2241 101.461 50.6748C101.461 38.1255 91.2793 31.2589 78.73 31.2589C66.1806 31.2589 55.9991 38.1255 55.9991 50.6748Z" fill="url(#paint0_linear_571_954)"/>
  <defs>
    <linearGradient id="paint0_linear_571_954" x1="85.6734" y1="0.00390625" x2="85.6733" y2="137.81" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A3CEFF"/>
      <stop offset="1" stop-color="#A3CEFF" stop-opacity="0.27"/>
    </linearGradient>
  </defs>
</svg></E2s>
           </Logo>

<Tree2s><img src={Tree2} alt="seazle" /></Tree2s>
<Tree1s><img src={Tree1} alt="seazle" /></Tree1s>
<Chairs><img src={Chair} alt="seazle" /></Chairs>
<Ball2s><img src={Ball2} alt="seazle" /></Ball2s> 
        </div>

  );
}