import type { IrFinancial, Disclosure } from '@/types';

export const FINANCIAL_DATA: IrFinancial[] = [
  { year: 2023, revenue: 6800, operatingProfit: 610 },
  { year: 2024, revenue: 7450, operatingProfit: 820 },
  { year: 2025, revenue: 8200, operatingProfit: 1050 },
];

export const DISCLOSURES: Disclosure[] = [
  {
    id: 'disc-001',
    title: '2025년 3분기 분기보고서',
    date: '2025-11-14',
    dartUrl: 'https://dart.fss.or.kr',
  },
  {
    id: 'disc-002',
    title: '임원·주요주주 특정증권 등 소유상황 보고서',
    date: '2025-10-21',
    dartUrl: 'https://dart.fss.or.kr',
  },
  {
    id: 'disc-003',
    title: '2025년 반기보고서',
    date: '2025-08-14',
    dartUrl: 'https://dart.fss.or.kr',
  },
  {
    id: 'disc-004',
    title: '주요사항보고서(타법인주식 및 출자증권 취득)',
    date: '2025-06-30',
    dartUrl: 'https://dart.fss.or.kr',
  },
  {
    id: 'disc-005',
    title: '2024년 사업보고서',
    date: '2025-03-31',
    dartUrl: 'https://dart.fss.or.kr',
  },
];

export const SHAREHOLDER_NOTICE = `
제25기 정기주주총회 소집 공고

GC MediAI 주식회사의 주주님께 아래와 같이 정기주주총회 개최를 알려드립니다.

• 일시: 2026년 3월 27일(금) 오전 10시
• 장소: 경기도 용인시 기흥구 이스트밸리로 20 GC MediAI 본사 대강당
• 의안:
  - 제1호 의안: 제25기(2025.01.01~2025.12.31) 재무제표 승인의 건
  - 제2호 의안: 이사 선임의 건 (사내이사 1명, 사외이사 2명)
  - 제3호 의안: 감사위원회 위원 선임의 건
  - 제4호 의안: 이사 보수한도 승인의 건

의결권 있는 주주님의 많은 참석을 부탁드립니다.
`.trim();
