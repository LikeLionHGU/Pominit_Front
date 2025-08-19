import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import data from "../../data/sufferingcenter.json";
import styled from "styled-components";

const API_BASE_URL = "https://www.liketiger.info:443";

const Grid = styled.div`
  position: absolute;
  top: 521.28px;
  left: 190px;
  display: grid;
  grid-template-columns: repeat(3, 284px);
  gap: 14px;
`;

const Card = styled.div`
  width: 284px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
`;

const Name = styled.div`
  color: #000;
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 600;
`;

const Script = styled.div`
  color: #000;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
`;


const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #555;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

const InfoItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;           
`;

const Dot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #6D6D6D;
  display: inline-block;
`;

const Truncate = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;


const Icon16 = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 17" fill="none" aria-hidden {...props}>
    <path d="M7.6532 13.3855C5.1468 13.2672 3.15271 11.2012 3.15271 8.66203C3.15271 6.05187 5.27291 3.93063 7.88177 3.93063C10.4197 3.93063 12.4847 5.9257 12.603 8.43334L10.9478 7.93654C10.6246 6.54078 9.37143 5.50776 7.88177 5.50776C6.1399 5.50776 4.72906 6.91929 4.72906 8.66203C4.72906 10.1524 5.76158 11.4062 7.15665 11.7295L7.6532 13.3855ZM15.7635 8.66203C15.7635 8.89859 15.7557 9.13517 15.732 9.37173L14.1793 8.90648C14.1872 8.82762 14.1872 8.74088 14.1872 8.66203C14.1872 5.17656 11.3655 2.3535 7.88177 2.3535C4.39803 2.3535 1.57635 5.17656 1.57635 8.66203C1.57635 12.1475 4.39803 14.9706 7.88177 14.9706C7.96059 14.9706 8.04729 14.9706 8.12611 14.9627L8.59113 16.5161C8.35468 16.5398 8.11823 16.5477 7.88177 16.5477C3.53103 16.5477 0 13.0149 0 8.66203C0 4.30914 3.53103 0.776367 7.88177 0.776367C12.2325 0.776367 15.7635 4.30914 15.7635 8.66203ZM12.7921 12.0213L14.5813 11.422C14.9438 11.3037 14.936 10.7833 14.5734 10.6729L8.58325 8.87494C8.28374 8.7882 8 9.06419 8.09458 9.36385L9.89163 15.3569C10.002 15.7276 10.5222 15.7355 10.6404 15.3648L11.2394 13.5748L14.3212 16.6581C14.4788 16.8158 14.7232 16.8158 14.8808 16.6581L15.8818 15.6566C16.0394 15.4989 16.0394 15.2544 15.8818 15.0967L12.7921 12.0213Z" fill="#FF517E"/>
  </svg>
);

const IconStar14 = (props) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden {...props}>
    <path d="M7 0.776367L8.5716 5.61325H13.6574L9.5429 8.60261L11.1145 13.4395L7 10.4501L2.8855 13.4395L4.4571 8.60261L0.342604 5.61325H5.4284L7 0.776367Z" fill="#FF517E"/>
  </svg>
);

const Wrapper = styled.div`
  position: absolute;
  top: 371px;
  left: 355px;
`;

const Field = styled.div`
  position: relative; 
  width: 533px;
  height: 46px;
`;

const Bar = styled.input`
display: flex;
width: 533px;
height: 46px;
padding: 11px 16px;
justify-content: space-between;
align-items: center;
flex-shrink: 0;
border-radius: 100px;
border: 1px solid #336DFF;
background: var(--BG-02, #FFF);
 &::placeholder {
    color: #999;
  }
 &:focus {
    outline: none;
  }
`;
const IconBtn = styled.button`
  all: unset;            
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  line-height: 0;        
`;

//부모로부터 sorting, sport를 props로 받고 기본값 설정함
export default function Centerlist({ sorting = 0, sport = "" }) {
  const [searchTerm, setSearchTerm] = useState(""); //검색어 상태
  const [lists, setLists] = useState([]); //최종 리스트 상태
  const [baseLists, setBaseLists] = useState([]); //검색 전, 기본데이터 리스트
  const [loading, setLoading] = useState(false); //api 호출 중 로딩 상태
  const navigate = useNavigate();

  // 정렬 prop 들어오는지 확인 -> sorting 값 바뀔 때마다 콘솔에 찍기
  useEffect(() => {
    console.log("[Centers] received sorting prop:", sorting);
  }, [sorting]);

  // 기본 리스트: 처음 + sorting/sport 바뀔 때
  useEffect(() => {
    // 검색 중이면 기본 리스트 재호출 스킵
    if (searchTerm.trim()) {
      console.log("[Centers] sorting changed but search is active -> skip list API");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const url = `${API_BASE_URL}/home/location/list`;
        const body = { sport, sorting };
        //요청 바디에 현재 선택된 sport와 sorting을 담음

        console.log("[Centers] POST /home/location/list body:", body);
        console.time("[Centers] fetch list");

        const res = await axios.post(url, body, {
          headers: { "Content-Type": "application/json" },
        });
        
        //최종적으로 arr에 강습소 목록 배열 저장
        const arr = Array.isArray(res.data) ? res.data : (res.data?.list || []);
        
        if (!cancelled) {
          console.log("[Centers] response items:", arr.length);
          setBaseLists(arr);
          setLists(arr);
        }
      } catch (e) {
        console.error("[Centers] list error:", e.response?.status, e.message);
      } finally {
        console.timeEnd("[Centers] fetch list");
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [sorting, sport, searchTerm]); //  정렬/종목 변경 반영

  // 검색 기능 실행하는 함수
  const Search = async () => {
    const keyword = searchTerm.trim().replace(/:.+$/, ""); //검색창에 입력된 값 앞 뒤 공백 제거하기
    //검색어 비어있을때
    if (!keyword) {
      setLists(baseLists);
      console.log("[Centers] search cleared -> restore base list:", baseLists.length);
      return;
    }

    try {
      setLoading(true);
      const url = `${API_BASE_URL}/home/location/search`;
      console.log("[Centers] GET /home/location/search params:", { input: keyword });
      console.time("[Centers] fetch search");

      //검색실행
      const res = await axios.get(url, { params: { input: keyword }, headers: { Accept: "application/json" } });
      
      //응답데이터가 배열이면 그대로 사용
      const arr = Array.isArray(res.data) ? res.data : (res.data?.list || []);
      console.log("[Centers] search response items:", arr.length);
      setLists(arr);
    } catch (e) {
      console.error("[Centers] search error:", e.response?.status, e.message);
    } finally {
      console.timeEnd("[Centers] fetch search");
      setLoading(false);
    }
  };

  return (
    <div>
<Grid>
      {lists.map((list) => (
        <Card key={list.id} onClick={() => navigate(`/detail/${list.id}`)}>
          <Thumbnail
            src={list.thumbnail}
            alt={list.thumbnail}
          />
          <Name>{list.name}</Name>
          <Script>{list.description}</Script>

          <InfoRow>
            <InfoItem style={{ maxWidth: 130 }}>
              <Icon16 />
              <Truncate>{list.region}</Truncate>
            </InfoItem>

            <Dot />

            <InfoItem>
              <IconStar14 />
              <span>{list.score}</span>
              <Dot />
              후기
              <span style={{ color: "#6D6D6D" }}>{list.reviewCount}개</span>
            </InfoItem>
          </InfoRow>
        </Card>
      ))}
    </Grid>

<Wrapper>
<Field>
<Bar
  placeholder="검색어를 입력해주세요! (ex. 입문자, 용흥동)"
  maxLength={28}
  value={searchTerm}                             
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      Search();
    }
  }}
/>

  <IconBtn aria-label="검색"onClick={Search}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
         viewBox="0 0 18 18" fill="none">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M15.1415 8.16975C15.1415 11.9043 11.9941 14.9318 8.11154 14.9318C4.22898 14.9318 1.08154 11.9043 1.08154 8.16975C1.08154 4.43517 4.22898 1.40769 8.11154 1.40769C11.9941 1.40769 15.1415 4.43517 15.1415 8.16975ZM13.2811 14.1826C11.8775 15.3004 10.0761 15.9721 8.11154 15.9721C3.63166 15.9721 0 12.4789 0 8.16975C0 3.86061 3.63166 0.367371 8.11154 0.367371C12.5914 0.367371 16.2231 3.86061 16.2231 8.16975C16.2231 10.2147 15.4052 12.0759 14.0669 13.4672L17.6327 16.8971L16.8679 17.6327L13.2811 14.1826Z"
        fill="black"/>
      <path fillRule="evenodd" clipRule="evenodd"
        d="M0 8.11661C0 3.63045 3.69997 0 8.25627 0C12.8126 0 16.5125 3.63045 16.5125 8.11661C16.5125 10.1721 15.7351 12.0491 14.4546 13.4785L18 16.9624L16.944 18L13.3707 14.4888C11.9642 15.5813 10.1872 16.2332 8.25627 16.2332C3.69997 16.2332 0 12.6028 0 8.11661ZM8.25627 0.416658C3.92299 0.416658 0.416537 3.86752 0.416537 8.11661C0.416537 12.3657 3.92299 15.8166 8.25627 15.8166C10.1562 15.8166 11.8974 15.153 13.2539 14.0494L13.3984 13.9319L16.944 17.4159L17.4056 16.9624L13.8736 13.4916L14.0134 13.3431C15.3066 11.9697 16.096 10.1337 16.096 8.11661C16.096 3.86752 12.5896 0.416658 8.25627 0.416658ZM1.07307 8.11661C1.07307 4.2128 4.29261 1.05444 8.25627 1.05444C12.2199 1.05444 15.4395 4.2128 15.4395 8.11661C15.4395 12.0204 12.2199 15.1788 8.25627 15.1788C4.29261 15.1788 1.07307 12.0204 1.07307 8.11661ZM8.25627 1.47109C4.51563 1.47109 1.4896 4.44987 1.4896 8.11661C1.4896 11.7833 4.51563 14.7621 8.25627 14.7621C11.9969 14.7621 15.0229 11.7833 15.0229 8.11661C15.0229 4.44987 11.9969 1.47109 8.25627 1.47109Z"
        fill="black"/>
    </svg>
  </IconBtn>
</Field>
</Wrapper>
    </div>
  

  );
};
