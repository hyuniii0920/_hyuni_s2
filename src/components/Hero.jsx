import styles from './Hero.module.css';

function SparkleO({ delay = 0 }) {
  return (
    <span className={styles.letterO}>
      O
      <span className={styles.oStar} style={{ animationDelay: `${delay}s` }}>✦</span>
    </span>
  );
}

export default function Hero({ isReady = true }) {
  return (
    <section id="hero" className={`${styles.hero} ${isReady ? styles.ready : styles.preparing}`}>
      <video
        className={styles.video}
        src="/main_wave.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        {/* 좌측 사이드바 */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarLine} />
          <div className={styles.sidebarCircleOuter}>
            <div className={styles.sidebarCircleInner} />
          </div>
          <div className={styles.sidebarText}>
            <span className={styles.label}>Developer</span>
            <p className={styles.greeting}>
              안녕하세요.<br />
              신입 개발자 <strong>조서현</strong>입니다.
            </p>
          </div>
        </div>

        {/* 하단 타이틀 */}
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>
            <span className={styles.sparkleAccent}>✦</span>
            <span className={styles.word}>
              P<SparkleO delay={0} />RTF<SparkleO delay={1.2} />LI<SparkleO delay={2.4} />
            </span>
            <span className={styles.sparkleAccent} style={{ animationDelay: '2s' }}>✦</span>
          </h1>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
