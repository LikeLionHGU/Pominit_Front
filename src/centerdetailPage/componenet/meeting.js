import styled from "styled-components";

const Title = styled.div`
  position: absolute;
  top: 1063.72px;
  left: 180px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
`;

const Text = styled.div`
  position: absolute;
  top: 1093.72px;
  left: 180px;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;

/* 스크롤 영역 컨테이너 */
const ScrollArea = styled.div`
  position: absolute;
  top: 1126.72px;
  left: 180px;
   display: flex;
  flex-direction: row;
    width: 878px;    
  gap: 12px;
 padding-bottom: 8px; 

    overflow-x: auto;
  overflow-y: hidden;


  /* (선택) 스크롤바 커스텀 - 크롬/엣지/사파리 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #c9c9c9;
  }
  &::-webkit-scrollbar-track {
    background: #f2f2f2;
  }
`;

/* 카드(박스) - absolute 제거! */
const Box = styled.div`
flex: 0 0 280px;      /* ← 가로 고정 폭 */
  min-width: 280px;
  display: flex;
  height: 131px;
  width: 280px;
  padding: 10px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 12px;
  background: #d9d9d9;
`;

const Meet = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
`;

const Icon = styled.div`
  width: 16px;
  height: 15px;
  flex: 0 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;

  svg { display: block; }
  svg path { fill: white; }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const When = styled.span`
  white-space: normal;
`;

export default function Meeting() {
  // 예시 데이터 (실제 데이터로 대체 가능)
  const meetings = Array.from({ length: 8 }).map((_, i) => ({
    title: `서핑웨이브에서 강습 받으실 분 #${i + 1}`,
    time: "8/10(일) 오후 3:00",
    place: "서핑웨이브",
    count: "3/6명",
  }));

  return (
    <div>
      <Title>함께 즐겨보면 어때요?</Title>
      <Text>해양 레포츠, 혼자 즐기기 어려웠다면 아래 모임에 참여해보세요!</Text>

      {/* 스크롤 영역 안에 여러 개의 박스를 렌더링 */}
      <ScrollArea>
        {meetings.map((m, idx) => (
          <Box key={idx}>
            <Meet>{m.title}</Meet>
            <InfoWrapper>
              <Info>
                <Icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                    <path opacity="0.9" d="M6.25895 14.0994V9.59622H9.73718V14.0994C9.73718 14.5947 10.1285 15 10.6067 15H13.2154C13.6937 15 14.085 14.5947 14.085 14.0994V7.79496H15.5632C15.9632 7.79496 16.1545 7.2816 15.8502 7.01141L8.58067 0.229661C8.25024 -0.0765536 7.7459 -0.0765536 7.41546 0.229661L0.145957 7.01141C-0.149693 7.2816 0.0329144 7.79496 0.432911 7.79496H1.91116V14.0994C1.91116 14.5947 2.30246 15 2.78072 15H5.38939C5.86765 15 6.25895 14.5947 6.25895 14.0994Z"/>
                  </svg>
                </Icon>
                <When>{m.time}</When>
              </Info>
              <Info>
                <Icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                    <path opacity="0.9" d="M6.25895 14.0994V9.59622H9.73718V14.0994C9.73718 14.5947 10.1285 15 10.6067 15H13.2154C13.6937 15 14.085 14.5947 14.085 14.0994V7.79496H15.5632C15.9632 7.79496 16.1545 7.2816 15.8502 7.01141L8.58067 0.229661C8.25024 -0.0765536 7.7459 -0.0765536 7.41546 0.229661L0.145957 7.01141C-0.149693 7.2816 0.0329144 7.79496 0.432911 7.79496H1.91116V14.0994C1.91116 14.5947 2.30246 15 2.78072 15H5.38939C5.86765 15 6.25895 14.5947 6.25895 14.0994Z"/>
                  </svg>
                </Icon>
                <When>{m.place}</When>
              </Info>
              <Info>
                <Icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                    <path opacity="0.9" d="M6.25895 14.0994V9.59622H9.73718V14.0994C9.73718 14.5947 10.1285 15 10.6067 15H13.2154C13.6937 15 14.085 14.5947 14.085 14.0994V7.79496H15.5632C15.9632 7.79496 16.1545 7.2816 15.8502 7.01141L8.58067 0.229661C8.25024 -0.0765536 7.7459 -0.0765536 7.41546 0.229661L0.145957 7.01141C-0.149693 7.2816 0.0329144 7.79496 0.432911 7.79496H1.91116V14.0994C1.91116 14.5947 2.30246 15 2.78072 15H5.38939C5.86765 15 6.25895 14.5947 6.25895 14.0994Z"/>
                  </svg>
                </Icon>
                <When>{m.count}</When>
              </Info>
            </InfoWrapper>
          </Box>
        ))}
      </ScrollArea>
    </div>
  );
}
