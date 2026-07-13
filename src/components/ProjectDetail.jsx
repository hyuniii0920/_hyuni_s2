import styles from './ProjectDetail.module.css';

const architectureSteps = [
  { title: 'OCR' },
  { title: 'Clause Parser' },
  { title: 'LLM Analysis' },
  { title: 'RAG Retrieval' },
  { title: 'Safety Score' },
  { title: 'Frontend' },
];

function Section({ eyebrow, title, children }) {
  return <section className={styles.section}><div className={styles.sectionHeading}><span className={styles.eyebrow}>{eyebrow}</span><h2 className={styles.sectionTitle}>{title}</h2></div>{children}</section>;
}

function excerpt(text, limit = 112) {
  const firstSentence = text.match(/^.*?[.!?。](?:\s|$)/)?.[0] || text;
  return firstSentence.length > limit ? `${firstSentence.slice(0, limit).trim()}…` : firstSentence;
}

function CaseDetail({ item }) {
  return <div className={styles.caseDetail}><div><span>Problem</span><p>{item.problem}</p></div><div><span>Solution</span><p>{item.process}</p></div><div><span>Impact</span><p>{item.result}</p></div></div>;
}

function ProblemCard({ item, index }) {
  return <article className={styles.caseCard}>
    <div className={styles.caseTopline}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3></div>
    <p className={styles.casePreview}>{item.preview || excerpt(item.problem)}</p>
    <div className={styles.caseImpact}><span>Impact</span><p>{excerpt(item.result)}</p></div>
    <details className={styles.expandable}><summary>문제 해결 과정 보기 <span>+</span></summary><CaseDetail item={item} /></details>
  </article>;
}

function StructuredDetail({ detail, project }) {
  const featuredCases = detail.problemSolving || [];

  return <div className={styles.structured}>
    {detail.motivation && <Section eyebrow="Context" title="The Problem">
      <div className={styles.problemIntro}><p>{excerpt(detail.motivation, 210)}</p><details className={styles.expandable}><summary>프로젝트 배경 전체 보기 <span>+</span></summary><p className={styles.expandedText}>{detail.motivation}</p></details></div>
    </Section>}

    {project.title === 'CLAIR' && <Section eyebrow="System" title="Analysis Architecture">
      <div className={styles.architecture} aria-label="OCR에서 Frontend로 이어지는 계약서 분석 흐름">{architectureSteps.map((step, index) => <div className={styles.architectureItem} key={step.title}><div className={styles.architectureNode} style={{ minHeight: '92px', padding: '8px 4px', border: 'none', borderRadius: 0, background: 'transparent', justifyContent: 'center', gap: '8px' }}><span>{String(index + 1).padStart(2, '0')}</span><strong style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25 }}>{step.title}</strong></div>{index < architectureSteps.length - 1 && <span className={styles.architectureArrow} aria-hidden="true">→</span>}</div>)}</div>
      <p className={styles.architectureCaption}>계약서 분석의 신뢰도를 높이는 AI 파이프라인</p>
    </Section>}

    {detail.careerDetail && detail.highlights?.length > 0 && <Section eyebrow="Responsibilities" title={detail.highlightsTitle || 'Key Responsibilities'}><div className={styles.highlightGrid}>{detail.highlights.map((item, index) => <article key={item.title} className={styles.highlightCard}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></Section>}

    {featuredCases.length > 0 && <Section eyebrow={detail.careerDetail ? 'Experience' : 'Engineering'} title="Problem Solving">
      <div className={styles.caseList}>{featuredCases.map((item, index) => <ProblemCard item={item} index={index} key={item.title} />)}</div>
    </Section>}

    {detail.coreFeatures && <Section eyebrow="Capability" title="Core Features"><div className={styles.highlightGrid}>{detail.coreFeatures.map((item, index) => <article key={item.title} className={styles.highlightCard}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></Section>}

    {detail.stack && <Section eyebrow="Toolkit" title="Tech Stack"><div className={styles.stackGrid}>{Object.entries(detail.stack).map(([category, items]) => <div key={category} className={styles.stackGroup}><span className={styles.stackCategory}>{category}</span><div className={styles.techList}>{items.map((item) => <span key={item} className={styles.techItem}>{item}</span>)}</div></div>)}</div></Section>}

    {detail.github && <Section eyebrow="Source" title="Github"><div className={styles.githubLinks}>{(Array.isArray(detail.github) ? detail.github : [{ label: 'View repository', url: detail.github }]).map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}<span>↗</span></a>)}</div></Section>}
  </div>;
}

export default function ProjectDetail({ project, onClose }) {
  const detail = project.detail && typeof project.detail === 'object' ? project.detail : null;
  const heroResults = detail?.card?.checklist || (!detail?.careerDetail && detail?.highlights?.slice(0, 3).map((item) => item.title)) || [];
  const titleParts = project.title.match(/^(.+?)\s*(\([^)]*\))$/);
  return <div className={styles.overlay} onClick={onClose}><div className={styles.page} onClick={(event) => event.stopPropagation()}>
    <header className={styles.header}><button className={styles.back} onClick={onClose}>← All projects</button><button className={styles.close} onClick={onClose} aria-label="상세 페이지 닫기">×</button></header>
    <main className={styles.content}>
      <section className={styles.hero}><span className={styles.category} style={{ textTransform: 'none' }}>{project.desc}</span><h1 className={styles.title}>{titleParts ? <>{titleParts[1]} <span style={{ fontSize: '.45em', letterSpacing: '-.015em', color: 'var(--text-secondary)' }}>{titleParts[2]}</span></> : project.title}</h1>{detail?.summary && <p className={styles.summary}>{detail.summary}</p>}
        {heroResults.length > 0 && <div className={styles.heroResults}>{heroResults.map((item) => <span key={item}>✦ {item}</span>)}</div>}
        <div className={styles.heroMeta}>{detail?.period && <div><span>Period</span><p>{detail.period}</p></div>}{detail?.role && <div><span>Role</span>{typeof detail.role === 'object' ? <><p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{detail.role.title}</p><ul style={{ display: 'grid', gap: '5px', margin: '8px 0 0', padding: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, listStyle: 'none' }}>{detail.role.items.map((item) => <li key={item} style={{ display: 'flex', alignItems: 'baseline', gap: '9px' }}><i aria-hidden="true" style={{ width: '4px', height: '4px', flex: '0 0 4px', borderRadius: '50%', background: 'var(--text-muted)' }} />{item}</li>)}</ul></> : <p>{detail.role}</p>}</div>}</div>
      </section>
      <div className={styles.heroInline}>{project.image ? <img src={project.image} alt={`${project.title} 프로젝트 화면`} className={styles.heroInlineImg} style={{ height: 'auto', maxHeight: 'none', objectFit: 'contain' }} /> : <div className={styles.heroPlaceholder} />}</div>
      {detail ? <StructuredDetail detail={detail} project={project} /> : project.detail ? <div className={styles.body}>{project.detail}</div> : null}
    </main>
  </div></div>;
}
