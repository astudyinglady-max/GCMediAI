import styles from './HeroSection.module.scss';

// 이미지/영상 삽입이 용이한 100vh 플레이스홀더
export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      {/* 향후 이미지/영상 콘텐츠 영역 */}
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
