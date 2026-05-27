import { useScrollFade } from '../hooks/useScrollFade';
import styles from './Projects.module.css';

const projects = [
  {
    type: 'Notion',
    title: 'Project List',
    desc: '진행한 프로젝트의 기획, 설계, 결과물을 정리한 Notion 포트폴리오입니다.',
    linkLabel: '프로젝트 설명 보기 →',
    href: 'https://www.notion.so/SEOHYUN-CHO-658f109a9b758248804301d9b82ebddd',
  },
  {
    type: 'GitHub',
    title: 'Source Code',
    desc: '개인 프로젝트 및 스터디 레포지토리를 관리하는 GitHub 메인 계정입니다.',
    linkLabel: '소스코드 보기 →',
    href: 'https://github.com/hyuniii0920',
  },
];

export default function Projects() {
  const ref = useScrollFade();

  return (
    <section id="projects" className={styles.section} ref={ref}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNum}>03</span>
        <h2 className={`${styles.sectionTitle} fade-up`}>Projects</h2>
        <div className={styles.sectionLine} />
      </div>

      <p className={`${styles.subtext} fade-up delay-1`}>
        My Project List ( Github &amp; Notion )
      </p>

      <div className={styles.grid}>
        {projects.map((p, i) => (
          <a
            key={p.type}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className={`${styles.card} fade-up delay-${i + 2}`}
          >
            <span className={styles.cardType}>{p.type}</span>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardDesc}>{p.desc}</p>
            <span className={styles.cardLink}>{p.linkLabel}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
