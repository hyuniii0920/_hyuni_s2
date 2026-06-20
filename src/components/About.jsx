import { useScrollFade } from '../hooks/useScrollFade';
import styles from './About.module.css';

const infoRows = [
  { label: 'Name', value: '조서현 / Seo Hyun Cho' },
  { label: 'Birth', value: '2003 . 09 . 20' },
  { label: 'Email', value: 'hyuniii0920@gmail.com' },
];

const skills = [
  {
    category: 'Language',
    tags: ['Python', 'Java', 'C', 'C#', 'C++', 'SQL', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
  },
  {
    category: 'Tool',
    tags: ['MySQL', 'IntelliJ', 'VSCode', 'Colab', 'Git', 'GitHub'],
  },
  {
    category: 'Infra & OS',
    tags: ['OS 환경 설정', 'IP/DNS 구성', '서버 트러블슈팅', 'Vercel', 'Netlify', 'Git Actions'],
  },
  {
    category: 'Design',
    tags: ['Figma', 'Illustrator'],
  },
  {
    category: 'AI',
    tags: ['ML', 'Vibecoding', 'Langchain', 'RAG', 'LLM'],
  },
  {
    category: 'Office',
    tags: ['Word', 'PowerPoint', 'Excel', 'Google Workspace'],
  },
];

export default function About() {
  const ref = useScrollFade();

  return (
    <section id="about" className={styles.section} ref={ref}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNum}>01</span>
        <h2 className={`${styles.sectionTitle} fade-up`}>About</h2>
        <div className={styles.sectionLine} />
      </div>

      <div className={styles.grid}>
        {/* 좌측: 소개 + 링크 */}
        <div className={styles.left}>
          <div className={`${styles.tagline} fade-up delay-1`}>
            <p>상상을 현실적인 사용자 가치로 전환하는 신입 개발자, 조서현입니다.</p>
          </div>

          <div className={`${styles.infoBlock} fade-up delay-2`}>
            <h3 className={styles.blockTitle}>About me</h3>
            {infoRows.map((r) => (
              <div key={r.label} className={styles.infoRow}>
                <span className={styles.infoLabel}>{r.label}</span>
                <span className={styles.infoValue}>{r.value}</span>
              </div>
            ))}
          </div>

          <div className={`${styles.infoBlock} fade-up delay-3`}>
            <h3 className={styles.blockTitle}>Git Hub</h3>
            <a
              href="https://github.com/hyuniii0920"
              target="_blank"
              rel="noreferrer"
              className={styles.linkItem}
            >
              <span className={styles.linkLabel}>Main ★</span>
              <span className={styles.linkUrl}>github.com/hyuniii0920</span>
            </a>
          </div>
        </div>

        {/* 우측: 스킬 */}
        <div className={styles.right}>
          <div className={`${styles.skillHeader} fade-up delay-1`}>
            <h3 className={styles.blockTitle}>Skill</h3>
          </div>
          <div className={styles.skillGrid}>
            {skills.map((s, i) => (
              <div
                key={s.category}
                className={`${styles.skillBlock} fade-up delay-${i + 1}`}
              >
                <span className={styles.skillCategory}>{s.category}</span>
                <div className={styles.skillTags}>
                  {s.tags.map((t) => (
                    <span key={t} className={styles.skillTag}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
