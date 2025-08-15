import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data/sufferingcenter.json";
import styled from "styled-components";

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
  gap: 6px;
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

const Info = styled.div`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #555;
`;

export default function SurfingCenters() {
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCenters(data);
  }, []);

  return (
    <Grid>
      {centers.map((center, idx) => (
        <Card key={idx} onClick={()=> navigate(`/detail/${idx}`)} style={{ cursor: "pointer" }}>
          <Thumbnail
            src={center["썸네일 이미지 URL"]}
            alt={center["강습소 이름"]}
          />
          <Name>{center["강습소 이름"]}</Name>
          <Script>{center["한줄 소개"]}</Script>
          <Info>{`${center["동네"]} · ${center["별점"]} · ${center["후기"]}`}</Info>
        </Card>
      ))}
    </Grid>
  );
}
