import { useEffect, useRef, useState } from 'react';
import styles from './Onboarding.module.css';

const MIN_DURATION = 3400;

export default function Onboarding({ onComplete, onExitStart, videoReady }) {
  const [minDurationPassed, setMinDurationPassed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    const minTimer = window.setTimeout(() => setMinDurationPassed(true), MIN_DURATION);
    return () => window.clearTimeout(minTimer);
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
        <p className={styles.loading} role="status" aria-live="polite">
          {videoReady ? 'MOTION READY' : 'LOADING MAIN MOTION'}<i /><i /><i />
        </p>
      </div>
      <div className={styles.bottomline}>
        <span>DEVELOPMENT</span>
        <span>→</span>
      </div>
    </section>
  );
}
