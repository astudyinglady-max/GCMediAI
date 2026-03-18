'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styles from './IrSection.module.scss';

// 헤더: 슬라이드 업
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

// 주가 카드: spring 쫀득
const stockCardVariants: Variants = {
  hidden: { opacity: 0, y: 52, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 18,
      mass: 0.9,
      delay: 0.05,
    },
  },
};

// 우측 nav 카드: spring 스태거
const navCardVariants: Variants = {
  hidden: { opacity: 0, y: 52, scale: 0.93 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 18,
      mass: 0.9,
      delay: 0.14 + i * 0.09,
    },
  }),
};

// 주가 mock 데이터 (기획안 기준 참고용)
const STOCK = {
  name: 'GCMediAI',
  code: '032620',
  price: 8250,
  change: 914,
  changePct: 3.74,
  open: 7950,
  high: 8380,
  low: 7890,
  volume: 42339,
};

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function IrSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* 섹션 헤더 */}
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
        >
          <span className={styles.label}>Investor Relations</span>
          <h2 className={styles.heading}>IR</h2>
        </motion.div>

        {/* 메인 그리드: 주가 카드(좌) + 버튼 열(우) */}
        <div className={styles.grid}>
          {/* ── 주가정보 카드 ── */}
          <motion.div
            className={styles.stockCard}
            variants={stockCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-60px' }}
          >
            <div className={styles.stockMeta}>
              <div>
                <span className={styles.stockName}>{STOCK.name}</span>
                <span className={styles.stockCode}>
                  KOSDAQ &nbsp;{STOCK.code}
                </span>
              </div>
              <span className={styles.stockBadge}>실시간 기준 (참고용)</span>
            </div>

            <div className={styles.stockPriceArea}>
              <p className={styles.stockPrice}>
                {formatNumber(STOCK.price)}
                <em>원</em>
              </p>
              <span className={styles.stockChange}>
                <span className={styles.arrow}>▲</span>
                {formatNumber(STOCK.change)}
                <span className={styles.stockChangePct}>
                  +{STOCK.changePct.toFixed(2)}%
                </span>
              </span>
            </div>

            <ul className={styles.stockGrid}>
              <li className={styles.stockStat}>
                <span className={styles.statLabel}>시가</span>
                <span className={styles.statValue}>
                  {formatNumber(STOCK.open)}
                </span>
              </li>
              <li className={styles.stockStat}>
                <span className={styles.statLabel}>거래량</span>
                <span className={styles.statValue}>
                  {formatNumber(STOCK.volume)}
                </span>
              </li>
              <li className={styles.stockStat}>
                <span className={styles.statLabel}>고가</span>
                <span className={`${styles.statValue} ${styles.statUp}`}>
                  {formatNumber(STOCK.high)}
                </span>
              </li>
              <li className={styles.stockStat}>
                <span className={styles.statLabel}>저가</span>
                <span className={styles.statValue}>
                  {formatNumber(STOCK.low)}
                </span>
              </li>
            </ul>

            {/* 주가 카드 배경 차트 데코 */}
            <div className={styles.stockChartBg} aria-hidden="true">
              <svg
                width="100%"
                height="200"
                viewBox="0 0 600 110"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Electric Blue → Deep Violet 가로 그라디언트 (메인 웨이브) */}
                  <linearGradient id="irPinkWave" x1="0" y1="0" x2="1" y2="0">
                    {!reducedMotion && (
                      <>
                        <animate attributeName="x1" values="0;0.2;0" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                        <animate attributeName="x2" values="1;1.2;1" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                      </>
                    )}
                    <stop offset="0%" stopColor="rgba(30,107,255,0.22)" />
                    <stop offset="100%" stopColor="rgba(63,58,168,0.16)" />
                  </linearGradient>
                  {/* Navy → Deep Violet (보조 웨이브) */}
                  <linearGradient id="irPurpleWave" x1="0" y1="0" x2="1" y2="0">
                    {!reducedMotion && (
                      <>
                        <animate attributeName="x1" values="0.1;-0.1;0.1" dur="9s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                        <animate attributeName="x2" values="1.1;0.9;1.1" dur="9s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                      </>
                    )}
                    <stop offset="0%" stopColor="rgba(28,47,85,0.14)" />
                    <stop offset="100%" stopColor="rgba(63,58,168,0.09)" />
                  </linearGradient>
                </defs>

                {/* ── 수평 격자선 (3줄) ── */}
                <line
                  x1="0"
                  y1="30"
                  x2="600"
                  y2="30"
                  stroke="rgba(28,47,85,0.07)"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="60"
                  x2="600"
                  y2="60"
                  stroke="rgba(28,47,85,0.07)"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="90"
                  x2="600"
                  y2="90"
                  stroke="rgba(28,47,85,0.07)"
                  strokeWidth="1"
                />

                {/* ── 수직 격자선 + 인디케이터 마커 (5분할) ── */}
                {[120, 240, 360, 480].map((x) => (
                  <g key={x}>
                    <line
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="110"
                      stroke="rgba(28,47,85,0.07)"
                      strokeWidth="1"
                    />
                    {/* 상단 삼각 마커 */}
                    <polygon
                      points={`${x - 4},0 ${x + 4},0 ${x},7`}
                      fill="rgba(28,47,85,0.15)"
                    />
                  </g>
                ))}

                {/* ── 보조 웨이브 (퍼플, 뒤) ── */}
                <path
                  d="M0,90 C60,82 100,52 150,58 C200,64 220,80 260,76 C300,72 330,38 380,44 C420,50 450,74 480,70 C510,66 540,60 570,64 L600,66 L600,110 L0,110 Z"
                  fill="url(#irPurpleWave)"
                />

                {/* ── 메인 웨이브 (핑크, 앞) ── */}
                <path
                  d="M0,82 C60,70 100,36 150,42 C200,48 220,68 260,64 C300,60 330,22 380,28 C420,34 450,62 480,58 C510,54 540,46 570,50 L600,52 L600,110 L0,110 Z"
                  fill="url(#irPinkWave)"
                />

                {/* ── 메인 웨이브 외곽선 ── */}
                <path
                  d="M0,82 C60,70 100,36 150,42 C200,48 220,68 260,64 C300,60 330,22 380,28 C420,34 450,62 480,58 C510,54 540,46 570,50 L600,52"
                  stroke="rgba(30,107,255,0.40)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>

          {/* ── 우측 버튼 열 ── */}
          <div className={styles.buttonCol}>
            {/* 재무정보 배너 카드 */}
            <motion.div
              className={styles.bannerCardWrapper}
              variants={navCardVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-60px' }}
            >
              <Link href="/ir#financial" className={styles.bannerCard}>
                <div className={styles.bannerTop}>
                  <strong className={styles.bannerTitle}>재무정보</strong>
                  <p className={styles.bannerDesc}>
                    매출·영업이익·재무제표 등<br />
                    상세 재무 현황
                  </p>
                </div>
                <div className={styles.bannerBottom}>
                  <span className={styles.bannerArrow} aria-hidden="true">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12L12 2M12 2H4M12 2V10"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className={styles.bannerIllust} aria-hidden="true">
                    {/* 막대 그래프 + 상승 트렌드 라인 */}
                    <svg
                      width="108"
                      height="72"
                      viewBox="0 0 108 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="4"
                        y="42"
                        width="14"
                        height="26"
                        rx="3"
                        fill="rgba(255,255,255,0.18)"
                      />
                      <rect
                        x="24"
                        y="30"
                        width="14"
                        height="38"
                        rx="3"
                        fill="rgba(255,255,255,0.22)"
                      />
                      <rect
                        x="44"
                        y="18"
                        width="14"
                        height="50"
                        rx="3"
                        fill="rgba(255,255,255,0.28)"
                      />
                      <rect
                        x="64"
                        y="10"
                        width="14"
                        height="58"
                        rx="3"
                        fill="rgba(255,255,255,0.34)"
                      />
                      <rect
                        x="84"
                        y="2"
                        width="14"
                        height="66"
                        rx="3"
                        fill="rgba(255,255,255,0.40)"
                      />
                      <polyline
                        points="11,42 31,30 51,18 71,10 91,2"
                        stroke="rgba(255,255,255,0.65)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <circle
                        cx="91"
                        cy="2"
                        r="3"
                        fill="rgba(255,255,255,0.85)"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* 주주공고 배너 카드 */}
            <motion.div
              className={styles.bannerCardWrapper}
              variants={navCardVariants}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-60px' }}
            >
              <Link href="/ir#shareholder" className={styles.bannerCard}>
                <div className={styles.bannerTop}>
                  <strong className={styles.bannerTitle}>주주공고</strong>
                  <p className={styles.bannerDesc}>
                    정기주주총회 소집 공고 및<br />
                    주주 관련 공시 내용
                  </p>
                </div>
                <div className={styles.bannerBottom}>
                  <span className={styles.bannerArrow} aria-hidden="true">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12L12 2M12 2H4M12 2V10"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className={styles.bannerIllust} aria-hidden="true">
                    {/* 문서 아이콘 일러스트 */}
                    <svg
                      width="80"
                      height="72"
                      viewBox="0 0 80 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="12"
                        y="4"
                        width="56"
                        height="64"
                        rx="6"
                        fill="rgba(255,255,255,0.10)"
                        stroke="rgba(255,255,255,0.22)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="12"
                        y="4"
                        width="56"
                        height="64"
                        rx="6"
                        fill="rgba(255,255,255,0.06)"
                      />
                      <line
                        x1="24"
                        y1="24"
                        x2="56"
                        y2="24"
                        stroke="rgba(255,255,255,0.40)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="24"
                        y1="34"
                        x2="56"
                        y2="34"
                        stroke="rgba(255,255,255,0.28)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="24"
                        y1="44"
                        x2="48"
                        y2="44"
                        stroke="rgba(255,255,255,0.20)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="24"
                        y1="54"
                        x2="44"
                        y2="54"
                        stroke="rgba(255,255,255,0.14)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <rect
                        x="22"
                        y="8"
                        width="36"
                        height="10"
                        rx="3"
                        fill="rgba(255,255,255,0.18)"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
