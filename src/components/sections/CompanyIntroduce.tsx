'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import styles from './CompanyIntroduce.module.scss';
import GoogleGeminiEffect from '../ui/GoogleGeminiEffect/GoogleGeminiEffect';

/**
 * 스크롤 진행도 계산:
 *   p = (-rect.top) / (sectionHeight - viewportHeight)
 *   p = 0   → 섹션 상단이 뷰포트 상단에 닿는 순간 (sticky 시작)
 *   p = 1   → 섹션 하단이 뷰포트 하단에 닿는 순간 (sticky 해제)
 *
 * 섹션 height: 350vh → 스크롤 여행 = 250vh
 *
 * Phase 1 (p 0.00 → 0.43): 라인 드로잉 — 화면 고정
 * Gap    (p 0.43 → 0.55): 라인 완성 후 대기 (~30vh, 약 2스크롤)
 * Phase 2 (p 0.55 → 0.79): Left 컬럼 순차 등장 — 화면 고정
 * Phase 3 (p 0.79 → 0.97): Right 컬럼 순차 등장 — 화면 고정
 * Phase 4 (p 0.97 → 1.00): 완성 상태 유지, 다음 섹션으로 이동
 */
export default function CompanyIntroduce() {
  const sectionRef = useRef<HTMLElement>(null);
  // 0.07에서 시작 → 진입 시 라인이 약 20% 그려진 상태 (빈 화면 방지)
  const progress = useMotionValue(0.07);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      // -rect.top = 섹션 내 스크롤된 거리 (0 ~ scrollable)
      // 최솟값 0.07: 스크롤 전에도 라인이 약 20% 그려진 채 시작
      const p = Math.min(Math.max(-rect.top / scrollable, 0.07), 1);
      progress.set(p);
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // 마운트 시 초기값 반영
    return () => window.removeEventListener('scroll', update);
  }, [progress]);

  // ── Phase 1: 라인 드로잉 (각 라인 약간씩 늦게 시작) ──
  const pl0 = useTransform(progress, [0, 0.35], [0, 1.05]);
  const pl1 = useTransform(progress, [0.02, 0.37], [0, 1.05]);
  const pl2 = useTransform(progress, [0.04, 0.39], [0, 1.05]);
  const pl3 = useTransform(progress, [0.06, 0.41], [0, 1.05]);
  const pl4 = useTransform(progress, [0.08, 0.43], [0, 1.05]);

  // ── 라인 opacity: 진입 시 페이드인 → 유지 → Phase 2 전환 시 페이드아웃 ──
  const linesOpacity = useTransform(progress, [0.07, 0.18, 0.52, 0.67], [0, 1, 1, 0.08]);

  // ── Phase 2: Left 컬럼 순차 등장 (p=0.55 부터) ──
  const eyebrowOpacity = useTransform(progress, [0.55, 0.64], [0, 1]);
  const eyebrowY = useTransform(progress, [0.55, 0.64], [24, 0]);

  const titleLine1Opacity = useTransform(progress, [0.60, 0.69], [0, 1]);
  const titleLine1Y = useTransform(progress, [0.60, 0.69], [24, 0]);

  const titleLine2Opacity = useTransform(progress, [0.65, 0.74], [0, 1]);
  const titleLine2Y = useTransform(progress, [0.65, 0.74], [24, 0]);

  const titleLine3Opacity = useTransform(progress, [0.70, 0.79], [0, 1]);
  const titleLine3Y = useTransform(progress, [0.70, 0.79], [24, 0]);

  // ── Phase 3: Right 컬럼 순차 등장 (p=0.79 부터) ──
  const subTitleOpacity = useTransform(progress, [0.79, 0.86], [0, 1]);
  const subTitleY = useTransform(progress, [0.79, 0.86], [24, 0]);

  const bodyOpacity = useTransform(progress, [0.84, 0.91], [0, 1]);
  const bodyY = useTransform(progress, [0.84, 0.91], [24, 0]);

  const ctaOpacity = useTransform(progress, [0.90, 0.97], [0, 1]);
  const ctaY = useTransform(progress, [0.90, 0.97], [16, 0]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyWrapper}>
        {/* 배경 레이어 */}
        <div className={styles.bgDots} aria-hidden="true" />
        <div className={styles.bgGlowOrange} aria-hidden="true" />
        <div className={styles.bgGlowBlue} aria-hidden="true" />

        {/* 배경 라인 애니메이션 */}
        <GoogleGeminiEffect pathLengths={[pl0, pl1, pl2, pl3, pl4]} opacity={linesOpacity} />

        <div className={styles.inner}>
          {/* 왼쪽: 타이틀 */}
          <div className={styles.leftCol}>
            <motion.p
              className={styles.eyebrow}
              style={{ opacity: eyebrowOpacity, y: eyebrowY }}
            >
              Company Overview
            </motion.p>

            <h2 className={styles.title}>
              <motion.span
                className={styles.titleLine1}
                style={{ opacity: titleLine1Opacity, y: titleLine1Y }}
              >
                Beyond EMR,
              </motion.span>
              <motion.span
                className={styles.titleLine2}
                style={{ opacity: titleLine2Opacity, y: titleLine2Y }}
              >
                Toward
              </motion.span>
              <motion.span
                className={styles.titleLine3}
                style={{ opacity: titleLine3Opacity, y: titleLine3Y }}
              >
                Medical OS
              </motion.span>
            </h2>
          </div>

          {/* 오른쪽: 설명 및 CTA */}
          <div className={styles.rightCol}>
            <motion.p
              className={styles.subTitle}
              style={{ opacity: subTitleOpacity, y: subTitleY }}
            >
              더 큰 비전을 향해
              <br />
              도약하는 GC메디아이
            </motion.p>

            <motion.p
              className={styles.body}
              style={{ opacity: bodyOpacity, y: bodyY }}
            >
              국내 최대 의료 인프라와 AI 기술력을 기반으로
              <br />
              의료 현장의 AI 패러다임 전환을 선도하고
              <br />
              더 나아가 전 의료 생태계를 하나로 연결하는
              <br />
              Medical OS로 향합니다.
            </motion.p>

            <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
              <Link href="/about" className={styles.cta}>
                <span className={styles.ctaText}>회사소개 더보기</span>
                <span className={styles.ctaArrow} aria-hidden="true">
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
