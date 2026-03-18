export const COMPANY_INFO = {
  name: 'GC MediAI',
  fullName: '㈜GC메디아이',
  ceo: '김진태',
  founded: '1992년',
  vision: 'Beyond EMR, Toward Medical OS',
  address: '서울특별시 성동구 왕십리로 241, LF, GF층',
  phone: '02-2105-5000',
  businessNumber: '201-81-55688',
  narrative: `GC MediAI는 27년간 대한민국 의료 현장을 함께해온 의료 IT 전문 기업입니다.
1992년 사내벤처로 출발해 국내 최초 병·의원 EMR '의사랑'을 출시한 이후, 메디컬 인프라·데이터·플랫폼·유통에 이르는 통합 의료 생태계를 구축해 왔습니다.
압도적 인프라와 선도적 AI를 기반으로 대한민국 의료 생태계의 새로운 패러다임을 만들어갑니다.`,
};

// ── 3개 핵심 메시지 ──
export type Pillar = {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
};

export const COMPANY_PILLARS: Pillar[] = [
  {
    num: '01',
    title: 'No.1 Medical Infra',
    subtitle: '대한민국 No.1 메디컬 인프라',
    desc: '전국 25,000여 병·의원과 약국을 잇는 국내 최대 네트워크를 기반으로 유통에서 제약·데이터·플랫폼까지 의료 전반에 걸쳐 시장을 선도해 왔습니다.',
  },
  {
    num: '02',
    title: 'Medical AI Transformation',
    subtitle: '의료 현장의 AI 전환을 주도',
    desc: '의료진이 환자에만 집중할 수 있도록, 단순한 기록 관리를 넘어 AI가 진료를 보조하고 경영 효율을 극대화합니다. GC메디아이는 의료 현장의 AI 전환을 주도하고 있습니다.',
  },
  {
    num: '03',
    title: 'Toward Medical OS with AI',
    subtitle: '의료 생태계를 하나로 연결하는 오픈 플랫폼',
    desc: '병원, 약국, 환자 그리고 진료와 경영에 도움되는 모든 혁신적인 서비스들이 자유롭게 연결되는 오픈 플랫폼을 향해 나아갑니다.',
  },
];

// ── 연혁 ──
export type HistoryItem = {
  year: number;
  events: string[];
};

export const COMPANY_HISTORY: HistoryItem[] = [
  { year: 1992, events: ['㈜메디슨 사내벤처 1호 발족'] },
  {
    year: 1993,
    events: [
      "국내 최초 병·의원 EMR '의사랑' 출시",
      '이후 1994년, ㈜메디다스 법인 설립',
    ],
  },
  { year: 1998, events: ["약국 EMR '유팜' 출시"] },
  {
    year: 2001,
    events: [
      '병·의원 의료용품·의약품 온라인 쇼핑몰 오픈',
      '의약품 데이터 제공 및 시장분석 사업 진출',
    ],
  },
  { year: 2005, events: ['방사선 의료기기 유통사업 진출'] },
  { year: 2008, events: ['약국 의약품 자동조제기 사업 진출'] },
  { year: 2019, events: ['초음파 의료기기 유통사업 진출'] },
  { year: 2020, events: ['GC 녹십자 그룹 계열사 편입'] },
  {
    year: 2022,
    events: ['전략적 투자 및 인수를 통한 디지털 헬스케어 밸류체인 확장'],
  },
  {
    year: 2026,
    events: [
      '㈜GC메디아이로 사명 변경 · Medical OS 비전 선포',
      '의사랑AI 상용화',
    ],
  },
];

// ── 가족사·관계사 ──
export type FamilyCompany = {
  name: string;
  category: string;
  desc: string;
};

export const FAMILY_COMPANIES: FamilyCompany[] = [
  {
    name: 'GC',
    category: '그룹사',
    desc: '제약업에서 다져온 입지를 기반으로 디지털 헬스케어 산업을 리딩하는 그룹사입니다.',
  },
  {
    name: 'GC케어',
    category: '헬스케어 플랫폼',
    desc: "임직원 건강검진·건강증진 서비스를 중심으로 '어떠케어' 플랫폼을 운영하는 데이터 기반 헬스케어 기업입니다.",
  },
  {
    name: 'GC녹십자웰빙',
    category: '건강기능식품',
    desc: '개인 맞춤형 영양 주사제·건강기능식품을 공급하며 천연물 유래 의약품 및 건강기능식품을 연구개발하는 기업입니다.',
  },
  {
    name: 'GC녹십자',
    category: '전문의약품',
    desc: '독감·수두 등 백신 및 혈장유래 전문의약품 연구개발을 선두하며, 희귀병 환자의 삶의 질 향상을 위한 치료제를 연구하고 있습니다.',
  },
  {
    name: 'GC Cell',
    category: '바이오테크',
    desc: '글로벌 세포 치료제 솔루션을 선도 비전으로 삶에 도움을 주는 다양한 세포 치료기술을 개발하는 바이오테크 전문 기업입니다.',
  },
  {
    name: '헥톤프로젝트',
    category: '병원 EMR',
    desc: "병원급 EMR 솔루션 1위 '닥터스'를 운영하는 기업으로 EMR부터 실버케어까지 다양한 솔루션을 제공합니다.",
  },
  {
    name: '비브로스',
    category: '헬스케어 앱',
    desc: "병원 접수 및 예약 앱 '똑닥'을 운영하며 병원을 이용하는 경험을 혁신하는 헬스케어 기업입니다.",
  },
  {
    name: '아이쿱',
    category: '디지털 헬스',
    desc: '의료진과 환자가 함께 성장하는 기술을 바탕으로 의료의 디지털 전환을 선도하는 기업입니다.',
  },
];
