import Ball from "../../asset/img/ball.svg"
import Ball2 from "../../asset/img/ball2.svg";
import S from "../../asset/img/s.svg";
import E from "../../asset/img/e.svg";
import A from "../../asset/img/a.svg";
import Z from "../../asset/img/z.svg";
import L from "../../asset/img/l.svg";
import E2 from "../../asset/img/e2.svg";
import Tree1 from "../../asset/img/tree1.svg";
import Tree2 from "../../asset/img/tree2.svg";
import Chair from "../../asset/img/chair.svg";

import styled from "styled-components";

const Ballstyle = styled.div`
 position: absolute;  
  left: 330px;
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
  opacity: 0.9;
`;
const Tree2s = styled.div`
position: absolute;  
 top:10px;
  left: 400px;
  opacity: 0.9;
`;
const Chairs = styled.div`
position: absolute;  
 top:70px;
  left: 520px;
   opacity: 0.9;
`;
const Ball2s = styled.div`
position: absolute;  
 top:198px;
  left: 680px;
  opacity: 0.9;
`;
export default function MainPage() {
    return (
        <div>
           <Ballstyle><img src={Ball} alt="Ball" /></Ballstyle>
<Ss><img src={S} alt="seazle" /></Ss>
<Es><img src={E} alt="seazle" /></Es>
<As><img src={A} alt="seazle" /></As>
<Zs><img src={Z} alt="seazle" /></Zs>
<Ls><img src={L} alt="seazle" /></Ls>
<E2s><img src={E2} alt="seazle" /></E2s>
<Tree2s><img src={Tree2} alt="seazle" /></Tree2s>
<Tree1s><img src={Tree1} alt="seazle" /></Tree1s>
<Chairs><img src={Chair} alt="seazle" /></Chairs>
<Ball2s><img src={Ball2} alt="seazle" /></Ball2s> 
        </div>

  );
}