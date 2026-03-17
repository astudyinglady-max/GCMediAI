'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { NEWS_ITEMS } from '@/lib/data/news';
import styles from './NewsSection.module.scss';

// 헤더: 부드러운 슬라이드 업
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

// 카드: spring으로 쫀득하게 — 약간의 오버슈트 후 안착
const cardVariants: Variants = {
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
      delay: i * 0.09,
    },
  }),
};

// MORE 버튼: 마지막으로 페이드인
const moreBtnVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.38, ease: [0.4, 0, 0.2, 1] },
  },
};

// 날짜 포맷: '2025-11-20' → '2025.11.20'
function formatDate(dateStr: string): string {
  return dateStr.replace(/-/g, '.');
}

export default function NewsSection() {
  const items = NEWS_ITEMS.slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* 배경 글로우 */}
        <div className={styles.bgGlow1} aria-hidden="true" />
        <div className={styles.bgGlow2} aria-hidden="true" />

        {/* 섹션 헤더 */}
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
        >
          <h2 className={styles.heading}>NEWS</h2>
          <p className={styles.subheading}>
            GC MediAI 최신 소식&nbsp;·&nbsp;더 많은 정보
          </p>
        </motion.div>

        {/* 카드 목록 */}
        <div className={styles.cardTrack}>
          <ul className={styles.cardList}>
            {items.map((item, index) => (
              <motion.li
                key={item.slug}
                className={styles.cardItem}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-60px' }}
              >
                <Link href={`/ir/news/${item.slug}`} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardCategory}>{item.category}</span>
                    <span className={styles.cardDate}>
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardPreview}>{item.preview}</p>
                  <span className={styles.cardArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* MORE 버튼 */}
        <motion.div
          className={styles.moreWrap}
          variants={moreBtnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
        >
          <Link href="/ir/news" className={styles.moreBtn}>
            <span>MORE</span>
            <span aria-hidden="true">›</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
