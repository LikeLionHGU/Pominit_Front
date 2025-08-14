import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import styled from "styled-components";
const SidebarWrapper = styled.div`
  position: absolute;
  top: 83.72px;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 1060px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 0 0 12px 12px;
  background: var(--Foundation-White-white-500, #D9D9D9);
`;
export default function SurfingCenters() {

    return (
        <div className="container">
            <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        </div>
    );
}