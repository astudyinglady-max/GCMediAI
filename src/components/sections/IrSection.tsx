'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
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

// 주가 mock 데이터
const STOCK = {
  name: 'GC MediAI',
  code: '030350',
  price: 28450,
  change: 350,
  changePct: 1.25,
  open: 28100,
  high: 28700,
  low: 27980,
  volume: 142835,
};

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function IrSection() {
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
          </motion.div>

          {/* ── 우측 버튼 열 ── */}
          <div className={styles.buttonCol}>
            {/* 재무정보 버튼 */}
            <motion.div
              variants={navCardVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-60px' }}
            >
              <Link href="/ir#financial" className={styles.navCard}>
                <div className={styles.navCardInner}>
                  <span className={styles.navCardEyebrow}>Financial Data</span>
                  <strong className={styles.navCardTitle}>재무정보</strong>
                  <p className={styles.navCardDesc}>
                    매출·영업이익·재무제표 등 상세 재무 현황을 확인하세요.
                  </p>
                </div>
                <span className={styles.navCardArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </motion.div>

            {/* 주주공고 버튼 */}
            <motion.div
              variants={navCardVariants}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-60px' }}
            >
              <Link href="/ir#shareholder" className={styles.navCard}>
                <div className={styles.navCardInner}>
                  <span className={styles.navCardEyebrow}>
                    Shareholder Notice
                  </span>
                  <strong className={styles.navCardTitle}>주주공고</strong>
                  <p className={styles.navCardDesc}>
                    정기주주총회 소집 공고 및 주주 관련 공시 내용을 확인하세요.
                  </p>
                </div>
                <span className={styles.navCardArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
