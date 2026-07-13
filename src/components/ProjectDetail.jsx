import styles from './ProjectDetail.module.css';

function StructuredDetail({ detail }) {
  return (
    <div className={styles.structured}>

      {/* 프로젝트 동기 */}
      {detail.motivation && (
        <div className={styles.motivationBlock}>
          <span className={styles.motivationLabel}>Why</span>
          <p className={styles.motivationText}>{detail.motivation}</p>
        </div>
      )}

      {/* 한 줄 요약 */}
      {detail.summary && (
        <blockquote className={styles.summary}>{detail.summary}</blockquote>
      )}

      {/* 메타 정보 */}
      <div className={styles.metaRow}>
        {detail.period && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>기간</span>
            <span className={styles.metaValue}>{detail.period}</span>
          </div>
        )}
        {detail.role && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>역할</span>
            <span className={styles.metaValue}>{detail.role}</span>
          </div>
        )}
        {detail.github && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>GitHub</span>
            <div className={styles.githubLinks}>
              {Array.isArray(detail.github)
                ? detail.github.map(g => (
                    <a key={g.url} href={g.url} target="_blank" rel="noreferrer" className={styles.metaLink}>
                      {g.label} ↗
                    </a>
                  ))
                : <a href={detail.github} target="_blank" rel="noreferrer" className={styles.metaLink}>
                    {detail.github} ↗
                  </a>
              }
            </div>
          </div>
        )}
      </div>

      {/* 문제 해결 과정 */}
      {detail.problemSolving && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>문제 해결 과정</h3>
          <div className={styles.caseList}>
            {detail.problemSolving.map((c, i) => (
              <div key={i} className={styles.caseCard}>
                <h4 className={styles.caseTitle}>{c.title}</h4>
                <div className={styles.caseSteps}>
                  <div className={styles.caseStep}>
                    <span className={styles.caseStepLabel}>문제 원인</span>
                    <p className={styles.caseStepText}>{c.problem}</p>
                  </div>
                  <div className={styles.caseStep}>
                    <span className={styles.caseStepLabel}>해결 과정</span>
                    <p className={styles.caseStepText}>{c.process}</p>
                  </div>
                  <div className={styles.caseStep}>
                    <span className={styles.caseStepLabel}>결과</span>
                    <p className={styles.caseStepText}>{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 기술 스택 */}
      {detail.stack && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Tech Stack</h3>
          <div className={styles.stackGrid}>
            {Object.entries(detail.stack).map(([category, items]) => (
              <div key={category} className={styles.stackGroup}>
                <span className={styles.stackCategory}>{category}</span>
                <div className={styles.tags}>
                  {items.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 핵심 기능 */}
      {detail.highlights && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{detail.highlightsTitle || '핵심 기능'}</h3>
          <div className={styles.highlightGrid}>
            {detail.highlights.map((h, i) => (
              <div key={i} className={styles.highlightCard}>
                <span className={styles.highlightNum}>{String(i + 1).padStart(2, '0')}</span>
                <h4 className={styles.highlightTitle}>{h.title}</h4>
                <p className={styles.highlightDesc}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 기술적 의사결정 */}
      {detail.decisions && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>기술적 의사결정</h3>
          <div className={styles.decisionList}>
            {detail.decisions.map((d, i) => (
              <div key={i} className={styles.decisionItem}>
                <span className={styles.decisionLabel}>{d.label}</span>
                <p className={styles.decisionDetail}>{d.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default function ProjectDetail({ project, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.page} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <button className={styles.back} onClick={onClose}>← 닫기</button>
        </div>

        <div className={styles.hero}>
          {project.image
            ? <img src={project.image} alt={project.title} className={styles.heroImg} />
            : <div className={styles.heroPlaceholder} />}
        </div>

        <div className={styles.content}>
          <span className={styles.category}>{project.category}</span>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.desc}>{project.desc}</p>
          <div className={styles.divider} />

          {project.detail && typeof project.detail === 'object'
            ? <StructuredDetail detail={project.detail} />
            : project.detail
              ? <div className={styles.body}>{project.detail}</div>
              : null}
        </div>
      </div>
    </div>
  );
}
