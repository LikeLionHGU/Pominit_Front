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


const Centerlist =()=> {
  const [lists,setlists]=useState([]);
  const navigate = useNavigate();
  const [sortingCenters, setsortingCenters]=useState([]);
  const [form] = useState({
    sport: "",
    sorting: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchlist = async()=>{
      try{
        setLoading(true);
        const url = `${API_BASE_URL}/home/location/list`;
        setsortingCenters(url.data || []);
        const body = {
          sport: form.sport,
          sorting: form.sorting,
        };
  
        const res = await axios.post(url, body, {
            headers: { "Content-Type": "application/json" },
          });
          //console.log(res.data);
          setlists(res.data);
          console.log(lists);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    } 
    };
    fetchlist();
  },[]);

  return (
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
              <span style={{ color: "#6D6D6D" }}>{list.reviewCount}</span>
            </InfoItem>
          </InfoRow>
        </Card>
      ))}
    </Grid>
  );
};
export default Centerlist;
