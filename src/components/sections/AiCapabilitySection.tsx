'use client';

import { motion, type Variants } from 'framer-motion';
import styles from './AiCapabilitySection.module.scss';

const STATS = [
  {
    figure: '25,000처+',
    label: '국내 최대\n병·의원·약국 네트워크',
  },
  {
    figure: '2억건+',
    label: '연간 취급\n의료 DATA',
  },
  {
    figure: 'AI 전담',
    label: 'AI 엔지니어 중심\n전담 조직',
  },
  {
    figure: 'H100',
    label: '자체 Medical LLM\n구축 인프라',
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 18,
      mass: 0.9,
      delay: i * 0.08,
    },
  }),
};

export default function AiCapabilitySection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* 섹션 레이블 */}
        <motion.div
          className={styles.header}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
        >
          <span className={styles.eyebrow}>OUR AI CAPABILITY</span>
          <p className={styles.desc}>
            압도적 인프라와 선도적 AI를 기반으로
            <br />
            대한민국 의료 생태계의 새로운 패러다임을 만들어갑니다
          </p>
        </motion.div>

        {/* 수치 카드 4개 */}
        <ul className={styles.grid}>
          {STATS.map((stat, i) => (
            <motion.li
              key={stat.figure}
              className={styles.card}
              variants={cardVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-60px' }}
            >
              <span className={styles.figure}>{stat.figure}</span>
              <span className={styles.label}>
                {stat.label.split('\n').map((line, j) => (
                  <span key={j} className={styles.labelLine}>
                    {line}
                  </span>
                ))}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
