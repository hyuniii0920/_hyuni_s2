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
    tags: ['Python', 'Java', 'C', 'C#', 'C++', 'SQL'],
  },
  {
    category: 'Frontend',
    tags: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
  },
  {
    category: 'Backend · API',
    tags: ['FastAPI', 'SQLAlchemy', 'REST API', 'Google GenAI API'],
  },
  {
    category: 'Tool · DB',
    tags: ['IntelliJ IDEA', 'VS Code', 'Google Colab', 'Git', 'GitHub', 'Android', 'MySQL'],
  },
  {
    category: 'Infra · Deploy',
    tags: ['IP/DNS 구성', 'Vercel', 'Render', 'GitHub Actions (CI/CD)'],
  },
  {
    category: 'Design',
    tags: ['Figma', 'Illustrator'],
  },
  {
    category: 'AI',
    tags: ['ML', 'LangChain', 'RAG', 'LLM', 'VectorDB', 'Vision AI'],
  },
  {
    category: 'Office · Collaboration',
    tags: ['Word', 'PowerPoint', 'Excel (기초)', 'Google Workspace', 'Slack', 'Notion'],
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
            <p>사용자 문제를 발견하고 실행 가능한 해결책으로 만드는 신입 프로덕트 매니저, 조서현입니다.</p>
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
