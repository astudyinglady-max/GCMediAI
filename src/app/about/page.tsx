import type { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/data/company';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '회사소개 — GC MediAI',
  description: 'GC MediAI는 27년간 대한민국 의료 현장을 함께해온 의료 IT 전문 기업입니다.',
};

// 대형 연도 표시용 주요 연혁 (1993~2026)
// visualPct: 가까운 항목 간 최소 간격 확보를 위한 시각 위치 오버라이드
const KEY_MILESTONES = [
  { year: 1993, label: '설립' },
  { year: 1998, label: '의사랑 출시' },
  { year: 2012, label: '코스닥 상장' },
  { year: 2015, label: 'GC그룹 편입' },
  { year: 2025, label: 'Medical OS 출시', visualPct: 86 },
  { year: 2026, label: 'GC MediAI\n사명 변경', visualPct: 100 },
];

const START_YEAR = 1993;
const END_YEAR = 2026;
const SPAN = END_YEAR - START_YEAR;

export default function AboutPage() {
  return (
    <main className={styles.main}>
      {/* 히어로 */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>About GC MediAI</p>
        <h1 className={styles.heading}>{COMPANY_INFO.vision}</h1>
        <p className={styles.sub}>
          27년간 대한민국 의료 현장을 함께해온 의료 IT 전문 기업
        </p>
      </section>

      {/* 기업 소개 */}
      <section className={styles.narrative}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>기업 소개</h2>
          {COMPANY_INFO.narrative.split('\n').map((para, i) => (
            <p key={i} className={styles.para}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* 주요 지표 — 베이지 배경 */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>3만+</span>
              <span className={styles.statLabel}>도입 의원</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2만+</span>
              <span className={styles.statLabel}>도입 약국</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1,000만</span>
              <span className={styles.statLabel}>누적 환자 가입자</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>27년</span>
              <span className={styles.statLabel}>의료 IT 경험</span>
            </div>
          </div>
        </div>
      </section>

      {/* 연혁 — 간소화 대형 연도 표시 */}
      <section className={styles.history}>
        {/* 상단: 수직선 + 레이블 */}
        <div className={styles.historyHeader}>
          <div className={styles.historyVertLine} />
          <p className={styles.historyEyebrow}>COMPANY HISTORY</p>
          <p className={styles.historyDesc}>
            1993년 설립 이래, GC MediAI는 대한민국 의료 IT의 역사와 함께 성장해왔습니다.
          </p>
        </div>

        {/* 대형 연도 + 가로선 */}
        <div className={styles.historyYears}>
          <span className={styles.historyYearStart}>{START_YEAR}</span>
          <div className={styles.historyLine} />
          <span className={styles.historyYearEnd}>{END_YEAR}</span>
        </div>

        {/* 마일스톤 도트 라인 */}
        <div className={styles.historyMilestoneWrap}>
          <div className={styles.historyMilestoneLine} />
          {KEY_MILESTONES.map((m) => {
            const pct = m.visualPct ?? ((m.year - START_YEAR) / SPAN) * 100;
            return (
              <div
                key={m.year}
                className={styles.historyMilestone}
                style={{ left: `${pct}%` }}
              >
                <span className={styles.milestoneDot} />
                <span className={styles.milestoneYear}>{m.year}</span>
                <span className={styles.milestoneLabel}>
                  {m.label.split('\n').map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
