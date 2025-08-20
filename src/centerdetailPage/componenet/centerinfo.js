import styled from "styled-components";

const LeftThumb = styled.img`
  position: absolute;
  top: 83.72px;
  left: 180px;
  width: 520px;
  height: 297px;
  object-fit: cover;
  border-radius: 8px;
`;
const RightCol = styled.div`
  position: absolute;
  top: 83.72px;
  left: 720.37px;
  right: 60px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Title = styled.h1`
  margin: 0;
  color: #000;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.25;
`;
const Summary = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  align-self: stretch;
  width: 340px;
  white-space: pre-line;
`;

const InfoRow = styled.div`
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
  svg path { fill: #ff517e; }
`;
const InfoWrapper = styled.div`
  position: absolute;
  top: 248.22px;
  left: 720.37px;
  right: 60px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Address = styled.span`
  white-space: normal;
`;

function SummaryText({ text }) {
  const formatted = (text || "").replace(/([.?!])\s*/g, "$1\n").trim();
  return <Summary>{formatted}</Summary>;
}


function normalizeCenter(raw) {
  if (!raw) return null;
  return {
    name: raw.name ?? raw["강습소 이름"],
    imageUrl: raw.imageUrl ?? raw["썸네일 이미지 URL"],
    description: raw.description ?? raw["소개 글"],
    address: raw.address ?? raw["주소"],
    time: raw.time ?? raw["영업 시간"],
    number: raw.number ?? raw["전화번호"],
    socialLink: raw.socialLink ?? raw["웹사이트/SNS"],
    priceImgUrl: raw.priceImgUrl ?? raw["가격표 이미지 URL"] ?? raw["가격 이미지"],
  };
}

export default function CenterInfo({ center }) {
  if (!center) return null;

  const c = normalizeCenter(center);
  if (!c) return null;

  const socialLinks = Array.isArray(c.socialLink)
    ? c.socialLink
    : typeof c.socialLink === "string" && c.socialLink.length > 0
    ? c.socialLink.split(",")
    : [];

  return (
    <div>
      {c.imageUrl && <LeftThumb src={c.imageUrl} alt={c.name || "센터 이미지"} />}

      <RightCol>
        <Title>{c.name || "이름 없음"}</Title>
        <SummaryText text={c.description} />
      </RightCol>

      <InfoWrapper>
        {/* 주소 */}
        <InfoRow>
          <Icon>
            {/* 위치 아이콘 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M7.6532 12.6092C5.1468 12.4909 3.15271 10.4248 3.15271 7.88566C3.15271 5.27551 5.27291 3.15426 7.88177 3.15426C10.4197 3.15426 12.4847 5.14933 12.603 7.65697L10.9478 7.16018C10.6246 5.76442 9.37143 4.73139 7.88177 4.73139C6.1399 4.73139 4.72906 6.14293 4.72906 7.88566C4.72906 9.37605 5.76158 10.6299 7.15665 10.9532L7.6532 12.6092ZM15.7635 7.88566C15.7635 8.12223 15.7557 8.3588 15.732 8.59537L14.1793 8.13011C14.1872 8.05126 14.1872 7.96451 14.1872 7.88566C14.1872 4.4002 11.3655 1.57713 7.88177 1.57713C4.39803 1.57713 1.57635 4.4002 1.57635 7.88566C1.57635 11.3711 4.39803 14.1942 7.88177 14.1942C7.96059 14.1942 8.04729 14.1942 8.12611 14.1863L8.59113 15.7398C8.35468 15.7634 8.11823 15.7713 7.88177 15.7713C3.53103 15.7713 0 12.2385 0 7.88566C0 3.53277 3.53103 0 7.88177 0C12.2325 0 15.7635 3.53277 15.7635 7.88566ZM12.7921 11.2449L14.5813 10.6456C14.9438 10.5274 14.936 10.0069 14.5734 9.8965L8.58325 8.09857C8.28374 8.01183 8 8.28783 8.09458 8.58748L9.89163 14.5806C10.002 14.9512 10.5222 14.9591 10.6404 14.5885L11.2394 12.7984L14.3212 15.8817C14.4788 16.0394 14.7232 16.0394 14.8808 15.8817L15.8818 14.8802C16.0394 14.7225 16.0394 14.4781 15.8818 14.3204L12.7921 11.2449Z" fill="#FF517E"/>
</svg>
          </Icon>
          <Address>{c.address || "주소 정보 없음"}</Address>
        </InfoRow>

        {/* 영업 시간 */}
        <InfoRow>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
              <path d="M12.441 0C11.9523 0 11.5524 0.39989 11.5524 0.888644V1.77729H4.44322V0.888644C4.44322 0.39989 4.04333 0 3.55457 0C3.06582 0 2.66593 0.39989 2.66593 0.888644V1.77729H1.77729C0.790893 1.77729 0.00888643 2.57707 0.00888643 3.55457L0 15.9956C0 16.9731 0.790893 17.7729 1.77729 17.7729H14.2183C15.1958 17.7729 15.9956 16.9731 15.9956 15.9956V3.55457C15.9956 2.57707 15.1958 1.77729 14.2183 1.77729H13.3297V0.888644C13.3297 0.39989 12.9298 0 12.441 0ZM14.2183 15.9956H1.77729V7.10915H14.2183V15.9956Z" fill="#FF517E"/>
            </svg>
          </Icon>
          <Address>{c.time || "영업 시간 정보 없음"}</Address>
        </InfoRow>

        {/* 전화번호 */}
        <InfoRow>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M14.4323 11.1838L12.17 10.9255C11.6267 10.8632 11.0923 11.0502 10.7093 11.4332L9.07041 13.0721C6.54978 11.7895 4.4834 9.73198 3.20082 7.20243L4.84858 5.55466C5.23157 5.17166 5.41862 4.63725 5.35627 4.09393L5.09797 1.8494C4.99109 0.94981 4.23401 0.272888 3.32551 0.272888H1.78464C0.778165 0.272888 -0.0590758 1.11013 0.0032719 2.11661C0.475333 9.72307 6.55869 15.7976 14.1562 16.2696C15.1627 16.332 15.9999 15.4947 15.9999 14.4882V12.9474C16.0088 12.0478 15.3319 11.2907 14.4323 11.1838Z" fill="#FF517E"/>
            </svg>
          </Icon>
          <Address>{c.number || "연락처 정보 없음"}</Address>
        </InfoRow>

        {/* 가격표 이미지 링크 */}
        <InfoRow
          as={c.priceImgUrl ? "a" : "div"}
          href={c.priceImgUrl || undefined}
          target={c.priceImgUrl ? "_blank" : undefined}
          rel={c.priceImgUrl ? "noreferrer" : undefined}
          style={{ cursor: c.priceImgUrl ? "pointer" : "default", textDecoration: "none" }}
        >
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="19" viewBox="0 0 10 19" fill="none">
              <path d="M5.3 8.67289C3.03 8.08289 2.3 7.47289 2.3 6.52289C2.3 5.43289 3.31 4.67289 5 4.67289C6.42 4.67289 7.13 5.21289 7.39 6.07289C7.51 6.47289 7.84 6.77289 8.26 6.77289H8.56C9.22 6.77289 9.69 6.12289 9.46 5.50289C9.04 4.32289 8.06 3.34289 6.5 2.96289V2.27289C6.5 1.44289 5.83 0.772888 5 0.772888C4.17 0.772888 3.5 1.44289 3.5 2.27289V2.93289C1.56 3.35289 0 4.61289 0 6.54289C0 8.85289 1.91 10.0029 4.7 10.6729C7.2 11.2729 7.7 12.1529 7.7 13.0829C7.7 13.7729 7.21 14.8729 5 14.8729C3.35 14.8729 2.5 14.2829 2.17 13.4429C2.02 13.0529 1.68 12.7729 1.27 12.7729H0.99C0.32 12.7729 -0.15 13.4529 0.0999999 14.0729C0.67 15.4629 2 16.2829 3.5 16.6029V17.2729C3.5 18.1029 4.17 18.7729 5 18.7729C5.83 18.7729 6.5 18.1029 6.5 17.2729V16.6229C8.45 16.2529 10 15.1229 10 13.0729C10 10.2329 7.57 9.26289 5.3 8.67289Z" fill="#FF517E"/>
            </svg>
          </Icon>
          <Address>{c.priceImgUrl ? "가격표 이미지로 보기" : "가격 정보 없음"}</Address>
        </InfoRow>

        {/* 웹사이트 / SNS */}
        <InfoRow>
          <Icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
  <path d="M10.869 1.00635L8.49519 2.64644C8.06 2.94712 7.94994 3.54921 8.25062 3.9844C8.5513 4.4196 9.15339 4.52965 9.58858 4.22897L11.9624 2.58889C13.268 1.68684 15.0742 2.01701 15.9763 3.3226C16.8783 4.62819 16.5481 6.43443 15.2426 7.33648L12.8688 8.97657C12.4336 9.27725 12.3235 9.87933 12.6242 10.3145C12.9249 10.7497 13.527 10.8598 13.9621 10.5591L16.3359 8.91901C18.5198 7.41013 19.0677 4.4131 17.5588 2.22921C16.0499 0.0453114 13.0529 -0.502527 10.869 1.00635ZM6.48107 9.88294C6.78176 10.3181 7.38384 10.4282 7.81904 10.1275L12.5666 6.84734C13.0018 6.54666 13.1119 5.94458 12.8112 5.50938C12.5105 5.07418 11.9084 4.96413 11.4732 5.26481L6.72564 8.54498C6.29045 8.84566 6.18039 9.44775 6.48107 9.88294ZM9.70369 11.1634L7.32989 12.8034C6.02431 13.7055 4.21806 13.3753 3.31601 12.0697C2.41396 10.7641 2.74413 8.95789 4.04972 8.05584L6.42352 6.41575C6.85872 6.11507 6.96877 5.51299 6.66809 5.07779C6.36741 4.6426 5.76532 4.53254 5.33013 4.83322L2.95633 6.47331C0.772436 7.98219 0.224598 10.9792 1.73348 13.1631C3.24236 15.347 6.23939 15.8948 8.42329 14.386L10.7971 12.7459C11.2323 12.4452 11.3423 11.8431 11.0417 11.4079C10.741 10.9727 10.1389 10.8627 9.70369 11.1634Z" fill="#FF517E"/>
</svg>
          </Icon>
          <Address>
            {socialLinks.length > 0
              ? socialLinks
                  .map((link, i) => (
                    <a key={i} href={link.trim()} target="_blank" rel="noreferrer" style={{ color: "#336DFF" }}>
                      {i === 0 ? "링크" : `링크${i + 1}`}
                    </a>
                  ))
                  .reduce((prev, curr) => [prev, " · ", curr])
              : "링크 없음"}
          </Address>
        </InfoRow>
      </InfoWrapper>
    </div>
  );
}
