export const COMPANY_INFO = {
  name: 'GC MediAI',
  fullName: 'GC MediAI',
  ceo: '김진태',
  founded: '1992년',
  vision: 'Beyond EMR, Toward Medical OS',
  address: '서울특별시 성동구 왕십리로 241, LF, GF층',
  phone: '02-2105-5000',
  businessNumber: '201-81-55688',
  narrative: `GC MediAI는 27년간 대한민국 의료 현장을 함께해온 의료 IT 전문 기업입니다.
1998년 의원용 EMR 소프트웨어로 출발해 현재는 클라우드 EMR, 의약품 유통, 처방 빅데이터, 모바일 헬스케어까지 아우르는 통합 의료 플랫폼 기업으로 성장했습니다.
저희의 비전은 단순한 전자의무기록을 넘어, 병원 운영과 환자 경험, 의약품 유통과 데이터 분석이 하나로 연결되는 '의료 운영체제(Medical OS)'를 실현하는 것입니다.
전국 3만여 의원, 2만여 약국, 누적 가입자 1,000만 환자와 함께 대한민국 의료 디지털 전환의 최전선에 서 있습니다.`,
};

export type HistoryItem = {
  year: number;
  month?: number;
  event: string;
};

export const COMPANY_HISTORY: HistoryItem[] = [
  { year: 1998, month: 3, event: "의원용 전자의무기록(EMR) 소프트웨어 '의사랑' 출시" },
  { year: 2003, month: 6, event: "의약품 유통 플랫폼 '유팜' 서비스 개시" },
  { year: 2008, month: 9, event: '처방 데이터 분석 전문 기업 UBIST 설립' },
  { year: 2012, month: 2, event: '코스닥 상장' },
  { year: 2015, month: 5, event: 'GC(녹십자홀딩스) 그룹 편입' },
  { year: 2018, month: 4, event: "모바일 병원 예약 앱 '똑닥' 출시" },
  { year: 2020, month: 1, event: '클라우드 EMR 서비스 정식 출시' },
  { year: 2021, month: 7, event: '비대면 진료 서비스 똑닥 런칭' },
  { year: 2023, month: 3, event: 'AI 임상 보조진단 모듈 의사랑 통합' },
  { year: 2024, month: 6, event: "의료 소모품 이커머스 '미소몰' 오픈" },
  { year: 2025, month: 11, event: 'Medical OS 플랫폼 정식 출시 / 누적 가입 환자 1,000만 돌파' },
];
