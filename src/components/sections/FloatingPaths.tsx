'use client';

import { motion } from 'framer-motion';
import styles from './FloatingPaths.module.scss';

type FloatingPathsProps = {
  position: number;
};

// 36개의 SVG 패스를 framer-motion으로 애니메이션
function FloatingPaths({ position }: FloatingPathsProps) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.05 + i * 0.03,
    opacity: 0.04 + i * 0.018,
  }));

  return (
    <div className={styles.pathsWrapper} aria-hidden="true">
      <svg
        className={styles.pathsSvg}
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, path.opacity, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + (path.id % 10),
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function FloatingPathsBg() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
