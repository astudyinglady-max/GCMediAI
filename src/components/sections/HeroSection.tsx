import Spline from '@splinetool/react-spline/next';
import styles from './HeroSection.module.scss';

// Spline 3D 영상 배경 + 텍스트 오버레이
export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      {/* 영상 배경 */}
      <div className={styles.videoBg} aria-hidden="true">
        <Spline scene="https://prod.spline.design/9pggRz28QREByu5x/scene.splinecode" />
      </div>

      {/* 어두운 오버레이 — 텍스트 가독성 확보 */}
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>GC MediAI · Medical OS Platform</p>

        <h1 className={styles.heading}>
          Beyond EMR,
          <br />
          Toward <em className={styles.headingAccent}>Medical OS</em>
        </h1>

        <p className={styles.sub}>
          27년간 쌓아온 의료 데이터 인프라 위에
          <br />
          AI와 클라우드가 더해진 다음 세대 의료 플랫폼
        </p>
      </div>

      {/* 스크롤 힌트 */}
      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollBar} />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
