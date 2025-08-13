import { useParams } from "react-router-dom";
import data from "../data/sufferingcenter.json";

export default function DetailPage() {
  const { id } = useParams();
  const center = data[id]; // id로 데이터 찾기

  if (!center) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={center["썸네일 이미지 URL"]}
        alt={center["강습소 이름"]}
        style={{ width: "100%", maxWidth: "500px", borderRadius: "12px" }}
      />
      <h1>{center["강습소 이름"]}</h1>
      <p>{center["한줄 소개"]}</p>
      <p>{center["동네"]} · {center["별점"]} · {center["후기"]}</p>
      <p>{center["소개 글"]}</p>
      <p>가격 정보: {center["가격 정보"]}</p>
      <p>영업 시간: {center["영업 시간"]}</p>
    </div>
  );
}
