'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { IrFinancial, Disclosure, FinancialRow, NewsItem } from '@/types';
import {
  FINANCIAL_YEARS,
  INCOME_STATEMENT,
  BALANCE_SHEET,
  type ShareholderNoticeItem,
} from '@/lib/data/ir';
import SubTabNav from '@/components/layout/SubTabNav/SubTabNav';
import styles from './IrPageClient.module.scss';

type Tab = '주가정보' | '재무정보' | '공시자료' | '주주공고' | 'NEWS';
const TABS: Tab[] = ['주가정보', '재무정보', '공시자료', '주주공고', 'NEWS'];
const IR_TAB_ITEMS = TABS.map((t) => ({ id: t, label: t }));

interface Props {
  financialData: IrFinancial[];
  disclosures: Disclosure[];
  shareholderNotice: string;
  shareholderNotices: ShareholderNoticeItem[];
  news: NewsItem[];
}

export default function IrPageClient({
  financialData,
  disclosures,
  shareholderNotices,
  news,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('재무정보');

  return (
    <div className={styles.wrapper}>
      {/* 탭 내비게이션 */}
      <SubTabNav
        tabs={IR_TAB_ITEMS}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as Tab)}
      />

      {/* 탭 콘텐츠 */}
      <div className={styles.tabContent}>
        {activeTab === '주가정보' && <StockTab />}
        {activeTab === '재무정보' && <FinancialTab financialData={financialData} />}
        {activeTab === '공시자료' && <DisclosureTab disclosures={disclosures} />}
        {activeTab === '주주공고' && (
          <ShareholderTab notices={shareholderNotices} />
        )}
        {activeTab === 'NEWS' && <NewsTab news={news} />}
      </div>
    </div>
  );
}

// 매매 동향 테이블 데이터
const TRADING_ROWS: [{ label: string; value: string }, { label: string; value: string }][] = [
  [{ label: '전일가(원)', value: '28,100' }, { label: '매도호가(원)', value: '28,500' }],
  [{ label: '전일거래량(주)', value: '38,420' }, { label: '매수호가(원)', value: '28,450' }],
  [{ label: '상한가(원)', value: '36,550' }, { label: '외국인보유(전주)', value: '2,105' }],
  [{ label: '하한가(원)', value: '19,750' }, { label: '외국인지분율', value: '11.69%' }],
  [{ label: '자본금(억원)', value: '90' }, { label: '상장주식(전주)', value: '18,012,000' }],
  [{ label: '액면가(원)', value: '500' }, { label: '시가총액(억원)', value: '5,122' }],
];

// ─────────────────────────────────────────────
// 주가정보 탭
// ─────────────────────────────────────────────
function StockTab() {
  return (
    <section className={styles.section}>
      <h2 className={styles.stockSectionTitle}>주가 정보</h2>
      <div className={styles.stockInfoRow}>
        <div className={styles.stockPriceCard}>
          <div className={styles.stockMeta}>
            <span className={styles.stockCompany}>GC MediAI</span>
            <span className={styles.stockCode}>036710</span>
          </div>
          <div className={styles.stockCurrentPrice}>28,450</div>
        </div>
        <div className={styles.stockChangeCard}>
          <div className={styles.stockChangeRow}>
            <span className={styles.stockChangeName}>전일대비</span>
            <span className={`${styles.stockChangeVal} ${styles.stockRise}`}>▲ 350(+1.25%)</span>
          </div>
          <div className={styles.stockChangeRow}>
            <span className={styles.stockChangeName}>고가</span>
            <span className={styles.stockChangeVal}>28,900</span>
          </div>
          <div className={styles.stockChangeRow}>
            <span className={styles.stockChangeName}>저가</span>
            <span className={styles.stockChangeVal}>27,800</span>
          </div>
          <div className={styles.stockChangeRow}>
            <span className={styles.stockChangeName}>거래량</span>
            <span className={styles.stockChangeVal}>45,281</span>
          </div>
        </div>
      </div>

      <h2 className={`${styles.stockSectionTitle} ${styles.stockSectionTitleGap}`}>매매 동향</h2>
      <table className={styles.tradingTable}>
        <tbody>
          {TRADING_ROWS.map(([left, right], i) => (
            <tr key={i} className={styles.tradingRow}>
              <td className={styles.tradingLabel}>{left.label}</td>
              <td className={styles.tradingValue}>{left.value}</td>
              <td className={styles.tradingLabel}>{right.label}</td>
              <td className={styles.tradingValue}>{right.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.stockDisclaimer}>
        ※ 주가 정보는 실시간이 아니며, 투자 판단의 근거로 사용할 수 없습니다.
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────
// 재무정보 탭
// ─────────────────────────────────────────────
function FinancialTab({ financialData }: { financialData: IrFinancial[] }) {
  const balanceChartData = [
    { name: '자산총계', data: [8300, 9400, 10700], color: '#1c2f55' },
    { name: '부채총계', data: [3200, 3500, 3780], color: '#f13c05' },
    { name: '자본총계', data: [5100, 5900, 6920], color: '#1e6bff' },
  ];
  const incomeChartData = [
    { name: '매출액', data: [6800, 7450, 8200], color: '#1c2f55' },
    { name: '영업이익', data: [610, 820, 1050], color: '#f13c05' },
    { name: '당기순이익', data: [440, 640, 845], color: '#1e6bff' },
  ];

  return (
    <>
      <section className={styles.section}>
        <div className={styles.chartRow}>
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>재무현황</h3>
            <p className={styles.chartUnit}>(단위: 억원)</p>
            <BarChart series={balanceChartData} years={FINANCIAL_YEARS} maxValue={12000} />
          </div>
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>손익현황</h3>
            <p className={styles.chartUnit}>(단위: 억원)</p>
            <BarChart series={incomeChartData} years={FINANCIAL_YEARS} maxValue={9000} />
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>요약 손익계산서</h2>
        <p className={styles.tableUnit}>(단위: 억원)</p>
        <FinancialTable rows={INCOME_STATEMENT} years={FINANCIAL_YEARS} />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>요약 재무상태표</h2>
        <p className={styles.tableUnit}>(단위: 억원)</p>
        <FinancialTable rows={BALANCE_SHEET} years={FINANCIAL_YEARS} />
      </section>
    </>
  );
}

// ─────────────────────────────────────────────
// SVG 막대 차트
// ─────────────────────────────────────────────
interface BarSeries {
  name: string;
  data: number[];
  color: string;
}

function BarChart({
  series,
  years,
  maxValue,
}: {
  series: BarSeries[];
  years: number[];
  maxValue: number;
}) {
  const vw = 400;
  const vh = 220;
  const pad = { top: 16, right: 16, bottom: 44, left: 52 };
  const plotW = vw - pad.left - pad.right;
  const plotH = vh - pad.top - pad.bottom;
  const groupW = plotW / years.length;
  const barCount = series.length;
  const barW = Math.min(24, (groupW - 16) / barCount);
  const groupBarW = barW * barCount + (barCount - 1) * 3;
  const tickValues = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue];

  return (
    <div className={styles.chartWrap}>
      <svg viewBox={`0 0 ${vw} ${vh}`} width='100%' aria-hidden='true'>
        {tickValues.map((v) => {
          const y = pad.top + plotH - (v / maxValue) * plotH;
          return (
            <g key={v}>
              <line x1={pad.left} y1={y} x2={pad.left + plotW} y2={y} stroke='#e8e8e8' strokeWidth={1} />
              <text x={pad.left - 6} y={y + 4} textAnchor='end' fontSize={10} fill='#888'>
                {v >= 10000
                  ? `${(v / 10000).toFixed(0)}조`
                  : v >= 1000
                    ? `${(v / 1000).toFixed(0)}천`
                    : v > 0
                      ? `${v}`
                      : '0'}
              </text>
            </g>
          );
        })}
        {years.map((year, gi) => {
          const groupX = pad.left + gi * groupW + (groupW - groupBarW) / 2;
          return (
            <g key={year}>
              {series.map((s, si) => {
                const x = groupX + si * (barW + 3);
                const barH = Math.max(2, (s.data[gi] / maxValue) * plotH);
                const y = pad.top + plotH - barH;
                return <rect key={si} x={x} y={y} width={barW} height={barH} fill={s.color} rx={2} opacity={0.9} />;
              })}
              <text
                x={pad.left + gi * groupW + groupW / 2}
                y={vh - pad.bottom + 14}
                textAnchor='middle'
                fontSize={11}
                fill='#444'
              >
                {year}
              </text>
            </g>
          );
        })}
      </svg>
      <div className={styles.legend}>
        {series.map((s) => (
          <span key={s.name} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 재무 테이블
// ─────────────────────────────────────────────
function FinancialTable({ rows, years }: { rows: FinancialRow[]; years: number[] }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.finTable}>
        <thead>
          <tr>
            <th className={styles.thLabel}>항목</th>
            {years.map((y) => (
              <th key={y} className={styles.thValue}>
                {y}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className={[
                row.isTotal ? styles.rowTotal : '',
                row.isSubTotal ? styles.rowSubTotal : '',
              ].join(' ')}
            >
              <td className={`${styles.tdLabel} ${row.indent ? styles.tdIndent : ''}`}>
                {row.label}
              </td>
              {row.values.map((v, i) => (
                <td key={i} className={`${styles.tdValue} ${v < 0 ? styles.tdNeg : ''}`}>
                  {v.toLocaleString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// 공시자료 탭 — 번호/등록일/제목 테이블 + 페이지네이션
// ─────────────────────────────────────────────
function DisclosureTab({ disclosures }: { disclosures: Disclosure[] }) {
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(disclosures.length / ITEMS_PER_PAGE));
  const pageItems = disclosures.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>공시자료</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.disclosureTable}>
          <thead>
            <tr>
              <th className={styles.discTh} style={{ width: 56 }}>번호</th>
              <th className={styles.discTh} style={{ width: 120 }}>등록일</th>
              <th className={styles.discTh}>제목</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((d, i) => (
              <tr key={d.id} className={styles.discRow}>
                <td className={styles.discTd}>
                  {disclosures.length - (page - 1) * ITEMS_PER_PAGE - i}
                </td>
                <td className={styles.discTd}>{d.date}</td>
                <td className={styles.discTd}>
                  <a
                    href={d.dartUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.discTitleLink}
                  >
                    {d.title}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label='이전 페이지'
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            className={`${styles.pageBtn} ${page === n ? styles.pageBtnActive : ''}`}
            onClick={() => setPage(n)}
          >
            {n}
          </button>
        ))}
        <button
          className={styles.pageBtn}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          aria-label='다음 페이지'
        >
          ›
        </button>
      </div>

      <p className={styles.dartNote}>
        전체 공시는{' '}
        <a href='https://dart.fss.or.kr' target='_blank' rel='noopener noreferrer'>
          DART
        </a>
        에서 확인하세요.
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────
// 주주공고 탭 — 연도 드롭다운 + 4열 테이블 + 다운로드 버튼
// ─────────────────────────────────────────────
function ShareholderTab({ notices }: { notices: ShareholderNoticeItem[] }) {
  const years = [...new Set(notices.map((n) => n.year))].sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState<number>(years[0] ?? new Date().getFullYear());
  const filtered = notices.filter((n) => n.year === selectedYear);

  return (
    <section className={styles.section}>
      <div className={styles.shareholderHeader}>
        <h2 className={styles.sectionTitle}>주주공고</h2>
        <div className={styles.shareholderActions}>
          <select
            className={styles.yearSelect}
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            aria-label='연도 선택'
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
          <a
            href='#'
            className={styles.downloadBtn}
            onClick={(e) => e.preventDefault()}
            aria-label='㈜GC메디아이 내부정보 관리규정 다운로드'
          >
            ↓ 내부정보 관리규정
          </a>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.disclosureTable}>
          <thead>
            <tr>
              <th className={styles.discTh} style={{ width: 56 }}>번호</th>
              <th className={styles.discTh} style={{ width: 120 }}>날짜</th>
              <th className={styles.discTh}>공시정보</th>
              <th className={styles.discTh} style={{ width: 160 }}>제출의무자</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item, i) => (
                <tr key={item.id} className={styles.discRow}>
                  <td className={styles.discTd}>{filtered.length - i}</td>
                  <td className={styles.discTd}>{item.date}</td>
                  <td className={styles.discTd}>
                    <span className={styles.discTitleLink}>{item.title}</span>
                  </td>
                  <td className={styles.discTd}>{item.submitter}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.discEmpty}>
                  해당 연도의 공시 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// NEWS 탭 — 좌이미지 + 우텍스트 리스트 + 페이지네이션
// ─────────────────────────────────────────────
function NewsTab({ news }: { news: NewsItem[] }) {
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.max(1, Math.ceil(news.length / ITEMS_PER_PAGE));
  const pageItems = news.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <section className={styles.section}>
      <div className={styles.newsTitleRow}>
        <h2 className={styles.sectionTitle}>최신 뉴스</h2>
        <Link href='/ir/news' className={styles.viewAll}>
          전체 보기 →
        </Link>
      </div>

      <ul className={styles.newsList}>
        {pageItems.map((item) => (
          <li key={item.slug}>
            <Link href={`/ir/news/${item.slug}`} className={styles.newsListItem}>
              {/* 이미지 플레이스홀더 */}
              <div className={styles.newsThumb} aria-hidden='true'>
                <span className={styles.newsThumbCategory}>{item.category}</span>
              </div>
              {/* 텍스트 */}
              <div className={styles.newsListText}>
                <span className={styles.newsCategory}>{item.category}</span>
                <h3 className={styles.newsTitle}>{item.title}</h3>
                <p className={styles.newsPreview}>{item.preview}</p>
                <span className={styles.newsDate}>{item.date}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label='이전 페이지'
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={`${styles.pageBtn} ${page === n ? styles.pageBtnActive : ''}`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label='다음 페이지'
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
