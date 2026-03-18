'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  COMPANY_INFO,
  COMPANY_PILLARS,
  COMPANY_HISTORY,
  FAMILY_COMPANIES,
} from '@/lib/data/company';
import SubTabNav from '@/components/layout/SubTabNav/SubTabNav';
import type { TabItem } from '@/components/layout/SubTabNav/SubTabNav';
import styles from './page.module.scss';

type AboutTab = 'GC메디아이' | '연혁' | '가족사/관계사' | '오시는 길';
const ABOUT_TABS: AboutTab[] = ['GC메디아이', '연혁', '가족사/관계사', '오시는 길'];
const ABOUT_TAB_ITEMS: TabItem[] = ABOUT_TABS.map((t) => ({ id: t, label: t }));

type HistoryPhase = 'First' | 'Growth' | 'Beyond';
const HISTORY_PHASES: { key: HistoryPhase; label: string; range: string }[] = [
  { key: 'First', label: 'First', range: '1992 – 2010' },
  { key: 'Growth', label: 'Growth', range: '2011 – 2022' },
  { key: 'Beyond', label: 'Beyond', range: '2023 –' },
];

// 연도별 단계 매핑
function getPhase(year: number): HistoryPhase {
  if (year <= 2010) return 'First';
  if (year <= 2022) return 'Growth';
  return 'Beyond';
}

type AboutClientProps = {
  subVisualSrc?: string;
};

export default function AboutClient({ subVisualSrc }: AboutClientProps) {
  const [activeTab, setActiveTab] = useState<AboutTab>('GC메디아이');

  return (
    <div className={styles.aboutClient}>
      {/* 서브탭 내비게이션 */}
      <SubTabNav
        tabs={ABOUT_TAB_ITEMS}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as AboutTab)}
      />

      {/* 서브비주얼 이미지 스트립 */}
      {subVisualSrc && (
        <div className={styles.subVisual}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={subVisualSrc} alt="" aria-hidden="true" className={styles.subVisualImg} />
        </div>
      )}

      {/* 탭 콘텐츠 */}
      {activeTab === 'GC메디아이' && <GcMediAiTab />}
      {activeTab === '연혁' && <HistoryTab />}
      {activeTab === '가족사/관계사' && <FamilyTab />}
      {activeTab === '오시는 길' && <LocationTab />}
    </div>
  );
}

// ─────────────────────────────────────────────
// GC메디아이 탭
// ─────────────────────────────────────────────
function GcMediAiTab() {
  return (
    <div className={styles.tabSection}>
      <div className={styles.container}>
        {/* 2단 소개 */}
        <div className={styles.introGrid}>
          <div className={styles.introText}>
            <p className={styles.sectionEyebrow}>GC MediAI</p>
            <h2 className={styles.introHeading}>
              압도적 인프라와<br />선도적 AI
            </h2>
            {COMPANY_INFO.narrative.split('\n').map((para, i) => (
              <p key={i} className={styles.para}>
                {para}
              </p>
            ))}
          </div>
          <div className={styles.introImageWrap}>
            <Image
              src='/images/company.png'
              alt='GC MediAI 회사 이미지'
              width={600}
              height={400}
              className={styles.introImage}
              priority
            />
          </div>
        </div>

        {/* 주요 지표 */}
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

        {/* 3개 핵심 메시지 */}
        <ul className={styles.pillarList}>
          {COMPANY_PILLARS.map((p) => (
            <li key={p.num} className={styles.pillarItem}>
              <span className={styles.pillarNum}>{p.num}</span>
              <div className={styles.pillarBody}>
                <span className={styles.pillarTitle}>{p.title}</span>
                <span className={styles.pillarSubtitle}>{p.subtitle}</span>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 연혁 탭
// ─────────────────────────────────────────────
function HistoryTab() {
  const [activePhase, setActivePhase] = useState<HistoryPhase>('First');
  const filteredHistory = COMPANY_HISTORY.filter(
    (item) => getPhase(item.year) === activePhase,
  );

  return (
    <div className={styles.tabSection}>
      <div className={styles.container}>
        <div className={styles.historyTabHeader}>
          <p className={styles.sectionEyebrow}>COMPANY HISTORY</p>
          <h2 className={styles.sectionHeading}>GC MediAI의 성장 여정</h2>

          {/* 단계 탭 버튼 */}
          <div className={styles.phaseTabRow}>
            {HISTORY_PHASES.map(({ key, label, range }) => (
              <button
                key={key}
                className={`${styles.phaseTabBtn} ${activePhase === key ? styles.phaseTabActive : ''}`}
                onClick={() => setActivePhase(key)}
              >
                <span className={styles.phaseLabel}>{label}</span>
                <span className={styles.phaseRange}>{range}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 연도별 이벤트 리스트 */}
        <ul className={styles.historyList}>
          {filteredHistory.map((item) => (
            <li key={item.year} className={styles.historyListItem}>
              <span className={styles.historyListYear}>{item.year}</span>
              <ul className={styles.historyEvents}>
                {item.events.map((event, i) => (
                  <li key={i} className={styles.historyEvent}>
                    {event}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 가족사·관계사 탭
// ─────────────────────────────────────────────
function FamilyTab() {
  return (
    <div className={`${styles.tabSection} ${styles.tabSectionAlt}`}>
      <div className={styles.container}>
        <p className={styles.sectionEyebrow}>FAMILY &amp; AFFILIATES</p>
        <h2 className={styles.sectionHeading}>가족사·관계사</h2>
        <p className={styles.familyDesc}>
          GC 그룹의 든든한 네트워크와 함께, 헬스케어 전 영역에서 시너지를 만들어 갑니다.
        </p>
        <ul className={styles.familyGrid}>
          {FAMILY_COMPANIES.map((company) => (
            <li key={company.name} className={styles.familyCard}>
              <div className={styles.familyCardHeader}>
                <span className={styles.familyName}>{company.name}</span>
                <span className={styles.familyCategory}>{company.category}</span>
              </div>
              <p className={styles.familyCardDesc}>{company.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 오시는 길 탭
// ─────────────────────────────────────────────
function LocationTab() {
  return (
    <div className={styles.tabSection}>
      <div className={styles.container}>
        <p className={styles.sectionEyebrow}>LOCATION</p>
        <h2 className={styles.sectionHeading}>오시는 길</h2>
        <div className={styles.locationInfo}>
          <div className={styles.locationDetail}>
            <p className={styles.locationLabel}>주소</p>
            <p className={styles.locationAddress}>{COMPANY_INFO.address}</p>
            <p className={styles.locationLabel} style={{ marginTop: 20 }}>대표번호</p>
            <p className={styles.locationPhone}>{COMPANY_INFO.phone}</p>
          </div>
          <div className={styles.mapWrap}>
            <iframe
              src='https://maps.google.com/maps?q=서울특별시+성동구+왕십리로+241&output=embed&hl=ko'
              width='100%'
              height='360'
              style={{ border: 0, borderRadius: 12 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='GC MediAI 위치'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
