import { useScrollFade } from '../hooks/useScrollFade';
import styles from './Projects.module.css';

const featured = [
  {
    id: 1,
    category: 'AI · Web',
    title: 'CLAIR-AI',
    desc: 'Gemini·LangChain 기반 AI 계약서 분석 서비스',
    image: '/project_photo/clair_main.png',
    detail: {
      period: '2026.03 ~ 현재 (진행 중)',
      role: '백엔드 · AI — FastAPI 서버 설계, AI 분석 파이프라인 설계·구현, Safety Score 알고리즘, DB 스키마 설계',
      github: [
        { label: 'clair-ai', url: 'https://github.com/KS-LEXA/clair-ai' },
        { label: 'clair-backend', url: 'https://github.com/KS-LEXA/clair-backend' },
        { label: 'clair-frontend', url: 'https://github.com/KS-LEXA/clair-frontend' },
      ],
      summary: 'OCR · LLM · RAG 파이프라인을 결합하여 법률 지식 없이도 계약서의 위험 조항을 자동으로 탐지하고, 안전도 점수와 근거 조항을 함께 제공하는 한국어 계약서 분석 플랫폼',
      stack: {
        Frontend: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Radix UI'],
        Backend: ['FastAPI', 'SQLAlchemy 2.x', 'MySQL 8', 'JWT + OAuth2', 'BCrypt'],
        AI: ['EasyOCR', 'Google Gemini', 'ChromaDB', 'Gemini Embedding', 'law.go.kr API'],
      },
      highlights: [
        {
          title: 'Safety Score 알고리즘',
          desc: '100점 기준에서 위험 조항별 severity_score × confidence × 카테고리 가중치로 감점. 고위험 조항 3개 이상 시 추가 -10점 패널티. AI가 아닌 백엔드에서 산출하여 모델 교체 없이 정책 조정 가능.',
        },
        {
          title: '8단계 AI 파이프라인',
          desc: 'OCR → 조항 분리 → 핵심 정보 추출 → 리스크 감지 → 요약 → RAG 인덱싱 → Q&A 추론 → 법령 준수 검사. Gemini 장애 시 9대 위험 유형 키워드 폴백으로 파이프라인 무중단 보장.',
        },
        {
          title: 'RAG 기반 자연어 Q&A',
          desc: 'ChromaDB 벡터 검색으로 관련 조항을 retrieval하고 Gemini로 답변 생성. evidence_clause_ids로 근거 조항 원문을 명시 반환하여 프론트에서 실시간 하이라이트 UX 구현.',
        },
        {
          title: '3-서비스 모노레포',
          desc: 'Frontend(5173) / Backend(8000) / AI(8001)로 역할 분리. 두 서버가 파일시스템 공유로 대용량 전송 없이 경로만 전달. BackgroundTask + 5단계 상태머신으로 장기 분석을 비동기 처리.',
        },
      ],
      decisions: [
        {
          label: 'contract_clauses 정규화',
          detail: 'JSON 통짜 컬럼 → 조항 행 단위 테이블로 분리. RAG 답변의 근거 조항을 JOIN으로 역추적하여 프론트 하이라이팅 UX 완성.',
        },
        {
          label: 'BackgroundTask 독립 DB 세션',
          detail: 'Request 세션 만료 후 DB 접근 오류를 차단하기 위해 BackgroundTask 내 SessionLocal()을 명시 생성·관리 (try/finally).',
        },
        {
          label: '방어적 프롬프트 엔지니어링',
          detail: 'AI에 점수를 직접 매기게 하지 않고 severity·confidence 수치만 Enum 제한 JSON으로 반환. 정규식으로 마크다운 블록을 제거한 뒤 파싱하여 안정성 확보.',
        },
      ],
    },
  },
  {
    id: 2,
    category: 'SaaS · Web',
    title: 'MZC Learn Platform',
    desc: '기업·개인 학습자 모두를 수용하는 멀티테넌트 SaaS 기반 학습 관리 시스템(LMS)',
    image: '/project_photo/MZC_LP_main.png',
    detail: '',
  },
  {
    id: 3,
    category: 'AR · Android',
    title: 'ArtBusan',
    desc: 'AR 기반 전시 안내 Android 앱',
    image: '/project_photo/ARTAR_main.png',
    detail: '',
  },
  {
    id: 4,
    category: 'Mobile · 대상 수상',
    title: 'PIYAK(dansynkpop)',
    desc: 'K-pop 아이돌 안무 연습 모바일 앱 — 2026 글로컬 Innovation Challenge Day 대상 (총장상)',
    image: null,
    detail: '',
  },
];

const links = [
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

export default function Projects({ onSelectProject }) {
  const ref = useScrollFade();

  return (
    <section id="projects" className={styles.section} ref={ref}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNum}>03</span>
        <h2 className={`${styles.sectionTitle} fade-up`}>Projects</h2>
        <div className={styles.sectionLine} />
      </div>

      {/* Featured */}
      <div className={styles.featuredGrid}>
        {featured.map((p, i) => (
          <button
            key={p.id}
            className={`${styles.featuredCard} fade-up delay-${(i % 4) + 1}`}
            onClick={() => onSelectProject(p)}
          >
            <div className={styles.featuredThumb}>
              {p.image
                ? <img src={p.image} alt={p.title} className={styles.featuredImg} />
                : <div className={styles.featuredPlaceholder} />}
            </div>
            <div className={styles.featuredInfo}>
              <span className={styles.featuredCategory}>{p.category}</span>
              <h3 className={styles.featuredTitle}>{p.title}</h3>
              <p className={styles.featuredDesc}>{p.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Notion / GitHub */}
      <p className={`${styles.subtext} fade-up`}>
        My Project List ( Github &amp; Notion )
      </p>
      <div className={styles.grid}>
        {links.map((p, i) => (
          <a
            key={p.type}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className={`${styles.card} fade-up delay-${i + 1}`}
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
