import type { IrFinancial, Disclosure, FinancialRow } from '@/types';

export const FINANCIAL_DATA: IrFinancial[] = [
  { year: 2023, revenue: 6800, operatingProfit: 610 },
  { year: 2024, revenue: 7450, operatingProfit: 820 },
  { year: 2025, revenue: 8200, operatingProfit: 1050 },
];

// 연도 순서: 2023, 2024, 2025
export const FINANCIAL_YEARS = [2023, 2024, 2025];

// 요약 손익계산서 (단위: 억원)
export const INCOME_STATEMENT: FinancialRow[] = [
  { label: '매출액', values: [6800, 7450, 8200] },
  { label: '매출원가', values: [4100, 4400, 4750], indent: true },
  { label: '매출총이익', values: [2700, 3050, 3450], isSubTotal: true },
  { label: '판매비와관리비', values: [2090, 2230, 2400], indent: true },
  { label: '영업이익', values: [610, 820, 1050], isSubTotal: true },
  { label: '기타영업외손익', values: [-20, 15, 30], indent: true },
  { label: '금융수익', values: [85, 110, 140], indent: true },
  { label: '금융비용', values: [-95, -100, -105], indent: true },
  { label: '법인세비용차감전순이익', values: [580, 845, 1115], isSubTotal: true },
  { label: '법인세비용', values: [-140, -205, -270], indent: true },
  { label: '당기순이익', values: [440, 640, 845], isTotal: true },
];

// 요약 재무상태표 (단위: 억원)
export const BALANCE_SHEET: FinancialRow[] = [
  { label: '유동자산', values: [3200, 3800, 4500], indent: true },
  { label: '비유동자산', values: [5100, 5600, 6200], indent: true },
  { label: '자산총계', values: [8300, 9400, 10700], isTotal: true },
  { label: '유동부채', values: [1800, 1950, 2100], indent: true },
  { label: '비유동부채', values: [1400, 1550, 1680], indent: true },
  { label: '부채총계', values: [3200, 3500, 3780], isSubTotal: true },
  { label: '자본금', values: [1800, 1800, 1800], indent: true },
  { label: '이익잉여금', values: [3300, 4100, 5120], indent: true },
  { label: '자본총계', values: [5100, 5900, 6920], isTotal: true },
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

// 주주공고 구조화 데이터
export type ShareholderNoticeItem = {
  id: number;
  date: string;
  title: string;
  submitter: string;
  year: number;
};

export const SHAREHOLDER_NOTICES: ShareholderNoticeItem[] = [
  {
    id: 1,
    date: '2026-02-10',
    title: '제25기 정기주주총회 소집 공고',
    submitter: '㈜GC메디아이',
    year: 2026,
  },
  {
    id: 2,
    date: '2025-02-08',
    title: '제24기 정기주주총회 소집 공고',
    submitter: '㈜GC메디아이',
    year: 2025,
  },
  {
    id: 3,
    date: '2024-02-10',
    title: '제23기 정기주주총회 소집 공고',
    submitter: '㈜유비케어',
    year: 2024,
  },
  {
    id: 4,
    date: '2023-02-09',
    title: '제22기 정기주주총회 소집 공고',
    submitter: '㈜유비케어',
    year: 2023,
  },
];
