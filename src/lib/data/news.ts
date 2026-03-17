import type { NewsItem } from '@/types';

export const NEWS_ITEMS: NewsItem[] = [
  {
    slug: 'gc-mediai-medical-os-launch-2025',
    title: 'GC MediAI, 차세대 Medical OS 플랫폼 정식 출시',
    date: '2025-11-20',
    preview: 'GC MediAI가 EMR을 넘어 통합 의료 운영체제를 표방하는 Medical OS 플랫폼을 정식 출시했다.',
    category: '제품·서비스',
    body: `GC MediAI(대표 홍길동)는 20일 차세대 통합 의료 플랫폼 'Medical OS'를 정식 출시했다고 밝혔다.\n\n이번 플랫폼은 27년간 누적한 의료 데이터 인프라를 기반으로 AI 진단 보조, 클라우드 EMR, 의약품 유통, 환자 접점 앱을 하나의 생태계로 통합한 것이 특징이다.\n\n회사 측은 "단순 전자의무기록을 넘어 병원 경영과 환자 경험 전반을 아우르는 의료 운영체제를 목표로 한다"고 설명했다.`,
  },
  {
    slug: 'ubist-ai-analysis-partnership-2025',
    title: 'UBIST, 글로벌 빅파마 3사와 AI 의약품 분석 MOU 체결',
    date: '2025-10-05',
    preview: 'GC MediAI 자회사 UBIST가 글로벌 제약사 3곳과 AI 기반 처방 데이터 분석 협력 MOU를 체결했다.',
    category: '파트너십',
    body: `GC MediAI 산하 의약품 데이터 분석 전문 기업 UBIST는 5일 글로벌 빅파마 3사와 'AI 기반 처방 데이터 분석' 협력을 위한 MOU를 체결했다.\n\n이번 협약을 통해 UBIST는 국내 약국·병원 처방 빅데이터를 AI로 분석해 글로벌 파트너사의 신약 마케팅 전략 수립을 지원할 예정이다.\n\nUBIST 대표는 "연간 2억 건 이상의 처방 데이터를 보유한 만큼 글로벌 제약사에 차별화된 인사이트를 제공할 수 있다"고 말했다.`,
  },
  {
    slug: 'ddocdoc-10m-users-2025',
    title: '똑닥, 누적 가입자 1,000만 돌파… 비대면 진료 1위 굳혀',
    date: '2025-09-12',
    preview: '모바일 의료 예약 플랫폼 똑닥이 누적 가입자 1,000만 명을 돌파하며 비대면 진료 시장 1위를 공고히 했다.',
    category: '마일스톤',
    body: `GC MediAI 계열 모바일 의료 서비스 플랫폼 똑닥(대표 이순신)이 12일 누적 가입자 1,000만 명을 돌파했다고 밝혔다.\n\n2018년 출시 이래 꾸준히 성장해온 똑닥은 병원 접수·예약, 비대면 진료, 처방전 전송 기능을 제공하며 환자 편의를 높여왔다.\n\n이 대표는 "1,000만 가입자를 발판으로 AI 증상 분석과 개인화 건강관리 기능을 강화해 진정한 헬스케어 슈퍼앱으로 도약하겠다"고 밝혔다.`,
  },
  {
    slug: 'gc-mediai-q3-earnings-2025',
    title: 'GC MediAI, 3분기 매출 역대 최고 기록',
    date: '2025-08-14',
    preview: 'GC MediAI가 2025년 3분기 연결 매출 2,100억 원을 기록해 분기 사상 최고치를 경신했다.',
    category: '실적',
    body: `GC MediAI는 14일 공시를 통해 2025년 3분기 연결 기준 매출 2,100억 원, 영업이익 280억 원을 기록했다고 밝혔다.\n\n전년 동기 대비 매출은 18% 증가했으며, 영업이익률은 13.3%로 개선됐다. 의사랑·유팜·UBIST 등 주력 서비스의 안정적 성장과 신규 AI 모듈 라이선스 매출이 실적을 견인했다.\n\n회사 측은 "4분기에도 클라우드 전환 수요와 AI 솔루션 확산에 힘입어 성장세를 이어갈 것"이라고 내다봤다.`,
  },
  {
    slug: 'ufarm-cloud-pharmacy-2025',
    title: '유팜, 클라우드 약국 솔루션 전국 3,000호점 돌파',
    date: '2025-07-22',
    preview: '의약품 유통 플랫폼 유팜이 클라우드 기반 약국 솔루션 도입 약국 3,000곳을 넘어섰다.',
    category: '사업확장',
    body: `GC MediAI의 의약품 유통 계열사 유팜은 22일 클라우드 약국 관리 솔루션 '유팜 클라우드'를 도입한 약국이 전국 3,000호점을 넘어섰다고 발표했다.\n\n유팜 클라우드는 재고 관리, 처방전 수신, 보험 청구를 통합 지원하는 SaaS형 솔루션이다. 도입 약국들은 평균 업무 처리 시간이 35% 단축됐다고 응답했다.\n\n유팜 대표는 "전국 2만여 약국 중 15%가 유팎 클라우드를 사용 중이다. 연내 5,000호점을 목표로 기능을 확대할 것"이라고 말했다.`,
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS_ITEMS.find((item) => item.slug === slug);
}

export function getAllNewsSlugs(): string[] {
  return NEWS_ITEMS.map((item) => item.slug);
}
