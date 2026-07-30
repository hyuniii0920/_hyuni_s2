import { useEffect, useRef, useState } from 'react';
import styles from './Onboarding.module.css';

const MIN_DURATION = 3400;
const FALLBACK_DURATION = 5200;

export default function Onboarding({ onComplete, onExitStart }) {
  const [videoReady, setVideoReady] = useState(false);
  const [minDurationPassed, setMinDurationPassed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    const minTimer = window.setTimeout(() => setMinDurationPassed(true), MIN_DURATION);
    const fallbackTimer = window.setTimeout(() => setVideoReady(true), FALLBACK_DURATION);
    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!videoReady || !minDurationPassed || hasCompleted.current) return;
    hasCompleted.current = true;
    onExitStart();
    setLeaving(true);
    const timer = window.setTimeout(onComplete, 600);
    return () => window.clearTimeout(timer);
  }, [minDurationPassed, onComplete, onExitStart, videoReady]);

  return (
    <section className={`${styles.onboarding} ${leaving ? styles.leaving : ''}`} aria-label="포트폴리오 준비 중">
      <video
        className={styles.preload}
        src="/main_wave.mp4"
        muted
        playsInline
        preload="auto"
        onCanPlayThrough={() => setVideoReady(true)}
        onError={() => setVideoReady(true)}
      />
      <div className={styles.grain} />
      <div className={styles.horizonSweep} aria-hidden="true"><span /></div>
      <div className={styles.passingWords} aria-hidden="true">
        <span>Innovator</span><span>Builder</span><span>Disruptor</span>
      </div>
      <div className={styles.topline}>
      </div>
      <div className={styles.center}>
        <p className={styles.kicker}>A wave unafraid to break is the one that carves the way</p>
        <div className={styles.wordmark} aria-hidden="true">
          <span className={styles.wordStudio}>Hello, I'm</span>
          <span className={styles.wordHyuni}>SEOHYUN</span>
        </div>
        <p className={styles.loading}>{videoReady ? 'MOTION READY' : 'LOADING MOTION'}<i /><i /><i /></p>
      </div>
      <div className={styles.bottomline}>
        <span>DEVELOPMENT</span>
        <span>→</span>
      </div>
    </section>
  );
}
