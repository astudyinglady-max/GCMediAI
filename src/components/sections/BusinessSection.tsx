'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BUSINESS_AREAS } from '@/lib/data/business';
import styles from './BusinessSection.module.scss';

type Business = {
  id: number;
  num: string;
  eyebrow: string;
  title: string;
  titleEn: string;
  desc: string;
  bgClass: string;
  href: string;
};

// business.ts에 없는 시각적 메타데이터만 관리 (id 키는 business.ts와 동일하게 유지)
const DISPLAY_META: Record<
  string,
  { eyebrowSuffix: string; titleEn: string; bgClass: string }
> = {
  uisarang: {
    eyebrowSuffix: 'Cloud EMR',
    titleEn: 'CLOUD EMR',
    bgClass: styles.bgEmr,
  },
  dataMarketing: {
    eyebrowSuffix: 'Pharmacy',
    titleEn: 'PHARMACY',
    bgClass: styles.bgAi,
  },
  platform: {
    eyebrowSuffix: 'Data Analytics',
    titleEn: 'DATA ANALYTICS',
    bgClass: styles.bgData,
  },
  distribution: {
    eyebrowSuffix: 'Mobile Health',
    titleEn: 'MOBILE HEALTH',
    bgClass: styles.bgMos,
  },
};

const BG_CLASSES = [styles.bgEmr, styles.bgAi, styles.bgData, styles.bgMos];

const BUSINESSES: Business[] = BUSINESS_AREAS.map((area, i) => {
  const meta = DISPLAY_META[area.id];
  const num = String(i + 1).padStart(2, '0');
  // area.name에 ' & '가 있으면 줄바꿈 처리 (예: '똑닥 & 미소몰' → '똑닥 &\n미소몰')
  const title = area.name.replace(' & ', ' &\n');
  return {
    id: i,
    num,
    eyebrow: `${num} · ${meta?.eyebrowSuffix ?? area.name}`,
    title,
    titleEn: meta?.titleEn ?? area.name.toUpperCase(),
    desc: area.description,
    bgClass: meta?.bgClass ?? BG_CLASSES[i % BG_CLASSES.length],
    href: area.services[0]?.url ?? '/business',
  };
});

// ── 카드 위치 정의 (cardsArea 기준 %) ──
// 4개 카드가 동시에 보임. 활성 카드 = HERO 자리.
const HERO = { left: 0, top: 0, width: 60, height: 50 }; // 좌상단 대형
const SPOT_A = { left: 62, top: 0, width: 37, height: 27 }; // 우상단 소형
const SPOT_B = { left: 0, top: 54, width: 47, height: 43 }; // 좌하단 중형
const SPOT_C = { left: 50, top: 54, width: 49, height: 43 }; // 우하단 중형

// [activeState][cardIndex] = 해당 카드의 위치
// 활성 카드가 HERO 자리 → 나머지 3개가 A/B/C를 순환
const POSITIONS = [
  [HERO, SPOT_A, SPOT_B, SPOT_C], // state 0: 01 HERO
  [SPOT_C, HERO, SPOT_A, SPOT_B], // state 1: 02 HERO
  [SPOT_B, SPOT_C, HERO, SPOT_A], // state 2: 03 HERO
  [SPOT_A, SPOT_B, SPOT_C, HERO], // state 3: 04 HERO
];

const TICKER = BUSINESSES.map((b) => b.titleEn).join(' · ') + ' · ';

const cardTransition = { duration: 0.75, ease: [0.4, 0, 0.2, 1] as const };

export default function BusinessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // 스크롤 이벤트 → activeIndex 계산
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const p = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const idx = Math.min(
        Math.floor(p * BUSINESSES.length),
        BUSINESSES.length - 1,
      );
      setActive(idx);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const biz = BUSINESSES[active];

  return (
    // 500vh: sticky 100vh + 스크롤 여행 400vh (사업 4개 × 100vh)
    <div ref={sectionRef} className={styles.section}>
      {/* ── 티커 ── */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          <span>{TICKER.repeat(6)}</span>
          <span aria-hidden="true">{TICKER.repeat(6)}</span>
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.sticky}>
          {/* ── 메인 콘텐츠: 카드 + 텍스트 ── */}
          <div className={styles.contentRow}>
            {/* 카드 영역 — absolute 배치 */}
            <div className={styles.cardsArea}>
              {BUSINESSES.map((b, idx) => {
                const pos = POSITIONS[active][idx];
                const isHero = idx === active;

                return (
                  <motion.div
                    key={b.id}
                    className={[styles.card, b.bgClass].join(' ')}
                    animate={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      width: `${pos.width}%`,
                      height: `${pos.height}%`,
                      zIndex: isHero ? 2 : 1,
                    }}
                    transition={cardTransition}
                  >
                    <div className={styles.cardOverlay} />

                    {/* 카드 번호 */}
                    <span
                      className={[
                        styles.cardNum,
                        isHero ? styles.cardNumHero : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {b.num}
                    </span>

                    {/* HERO일 때만 타이틀 표시 */}
                    <AnimatePresence>
                      {isHero && (
                        <motion.div
                          className={styles.cardHeroContent}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          <h3 className={styles.cardHeroTitle}>
                            {b.title.split('\n').map((line, i) => (
                              <span
                                key={i}
                                className={styles.cardHeroTitleLine}
                              >
                                {line}
                              </span>
                            ))}
                          </h3>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* 텍스트 패널 */}
            <div className={styles.textPanel}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className={styles.textContent}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className={styles.textCounter}>
                    <strong>{biz.num}</strong> / 04
                  </p>
                  <p className={styles.textEyebrow}>{biz.eyebrow}</p>
                  <h2 className={styles.textTitle}>
                    {biz.title.split('\n').map((line, i) => (
                      <span key={i} className={styles.textTitleLine}>
                        {line}
                      </span>
                    ))}
                  </h2>
                  <p className={styles.textDesc}>
                    {biz.desc.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </p>
                  <Link href={biz.href} className={styles.textCta}>
                    <span>자세히 보기</span>
                    <span className={styles.ctaArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* 단계 인디케이터 */}
              <div className={styles.stepIndicator} aria-hidden="true">
                {BUSINESSES.map((_, idx) => (
                  <div
                    key={idx}
                    className={[
                      styles.step,
                      idx === active ? styles.stepActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
