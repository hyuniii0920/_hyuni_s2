import { useScrollFade } from '../hooks/useScrollFade';
import styles from './Career.module.css';

const careers = [
  {
    date: '25.11 — 26.01',
    title: '메가존클라우드 ATU Data & Design Whole 팀 인턴',
    sub: '3개월',
  },
  {
    date: '25.07 — 25.08',
    title: '제로웹(IT) Frontend 개발 & UX/UI 디자인 팀 인턴',
    sub: '2개월',
  },
  {
    date: '2022 — 2026',
    title: '경성대학교 인포넷 랩실 연구원 및 랩장',
    sub: '4년',
  },
];

const education = [
  {
    date: '2022 — 현재',
    title: '경성대학교 컴퓨터공학과',
    sub: '졸업예정 ~ 2027.02',
  },
  {
    date: '2019 — 2021',
    title: '대명여자고등학교',
    sub: '졸업',
  },
];

const activities = [
  { year: '2026', text: '★ 경성대학교 글로컬 아이디어 공모전 대상(총장상) 수상 ★' },
  { year: '2026', text: 'DIVE 2026 - DX Challenge 해커톤 예선 합격 (진행중)' },
  { year: '2026', text: '피싱스캠 예방을 위한 서비스 개발 경진대회 96등 / 전체 644팀' },
  { year: '2025', text: '2025 LG Aimers AI 전문가 과정 수료' },
  { year: '2025', text: '2025 LG Aimers 온라인 해커톤' },
  { year: '2025', text: 'Busan Digital Asset Nexus (Bdan) 서포터즈 2기 활동' },
  { year: '2024 — 현재', text: 'IT 연합동아리 PROJECT 운영진' },
  { year: '2023', text: 'IT 연합동아리 PROJECT 100일 프로젝트 디자인 & 아이디어 부문 수상' },
];

function TimelineItem({ date, title, sub, delay }) {
  return (
    <div className={`${styles.timelineItem} fade-up delay-${delay}`}>
      <span className={styles.date}>{date}</span>
      <div>
        <p className={styles.itemTitle}>{title}</p>
        <p className={styles.itemSub}>{sub}</p>
      </div>
    </div>
  );
}

export default function Career() {
  const ref = useScrollFade();

  return (
    <section id="career" className={styles.section} ref={ref}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNum}>02</span>
        <h2 className={`${styles.sectionTitle} fade-up`}>Career</h2>
        <div className={styles.sectionLine} />
      </div>

      <div className={styles.topGrid}>
        {/* Career */}
        <div>
          <h3 className={`${styles.colTitle} fade-up delay-1`}>Career</h3>
          <div className={styles.timeline}>
            {careers.map((c, i) => (
              <TimelineItem key={c.title} {...c} delay={i + 2} />
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className={`${styles.colTitle} fade-up delay-1`}>Education</h3>
          <div className={styles.timeline}>
            {education.map((e, i) => (
              <TimelineItem key={e.title} {...e} delay={i + 2} />
            ))}
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className={styles.activityWrap}>
        <h3 className={`${styles.colTitle} fade-up`}>Activity</h3>
        <div className={styles.activityList}>
          {activities.map((a, i) => (
            <div
              key={a.text}
              className={`${styles.activityItem} fade-up delay-${(i % 4) + 1}`}
            >
              <span className={styles.activityYear}>{a.year}</span>
              <p className={styles.activityText}>{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
