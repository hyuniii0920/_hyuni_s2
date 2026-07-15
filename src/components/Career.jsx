import { useScrollFade } from '../hooks/useScrollFade';
import { featured } from './Projects';
import styles from './Career.module.css';

const mzcProject = featured.find(p => p.id === 2);

const careers = [
  {
    date: '25.11 — 26.01',
    title: '메가존클라우드 ATU Data & Design Whole 팀 인턴',
    sub: '3개월',
    detail: mzcProject,
  },
  {
    date: '24.07 — 24.08',
    title: '제로웹(IT) Frontend 개발 & UX/UI 디자인 팀 인턴',
    sub: '2개월',
    detail: {
      category: 'Internship · Frontend/UX',
      title: '제로웹',
      desc: '프론트엔드 개발/기획 & UX/UI 디자인 인턴',
      image: '/project_photo/zeroweb.png',
      detail: {
        careerDetail: true,
        period: '2024.07 ~ 2024.08',
        role: {
          title: '서비스 기획 · UX/UI 디자인',
          items: [
            '위치 기반 케어 서비스 기획부터 디자인까지 End-to-End 리드',
            '노약자 사용자 특성 분석 기반 접근성 UX 설계',
            '운영 서비스 사용자 피드백 기반 개선 우선순위 판단',
            '디자인-개발 협업 프로세스(Design-to-Code) 구축',
          ],
        },
        summary: 'Care Bell 위치 기반 노약자 케어 서비스의 UX/UI 디자인 · 퍼블리싱과 운영 서비스 프론트엔드 유지보수를 담당',
        highlightsTitle: 'Key Responsibilities',
        highlights: [
          {
            title: '운영 서비스 유지보수 및 기능 개발',
            desc: 'UI 오류 수정, 브라우저 호환성 개선을 담당하고 사용자 피드백 기반으로 UI 불편 요소를 지속 발굴·개선. 신규 기능 개발에도 참여해 요구사항 파악 → 설계 → 구현 → 검증 전 과정을 경험.',
          },
          {
            title: 'Care Bell 위치 기반 노약자 케어 서비스 기획 · 퍼블리싱 (End-to-End 단독 주도)',
            desc: '노약자의 안전·일상 활동 지원을 위한 위치 기반 케어 서비스를 기획부터 Figma 디자인, HTML/CSS/JS 퍼블리싱까지 전 과정 단독 주도.',
          },
          {
            title: '디자인-개발 간 Design-to-Code 협업',
            desc: 'Figma 디자인 결과물을 HTML/CSS/JS로 직접 퍼블리싱하며, 설계 단계부터 구현 가능성을 함께 고려해 디자인 의도가 화면에 정확히 구현되도록 작업.',
          },
        ],
        problemSolving: [
          {
            title: '노약자도 쉽게 쓸 수 있는 접근성 높은 UX를 설계했다',
            problem: '위치 기반 케어 서비스의 주 사용자층이 노약자였는데, 시력이 약하거나 디지털 기기 사용에 익숙하지 않은 사용자가 많아 일반적인 UI 밀도 · 인터랙션 방식으로 설계하면 핵심 기능에 접근하는 것 자체가 진입장벽이 되는 문제.',
            process: '사용자 행동 패턴을 분석해 정보 구조를 단순화하고, 시인성이 높은 컬러 · 타이포 가이드를 수립. 위치 확인 · 케어 요청 등 핵심 기능에 최소 인터랙션으로 도달할 수 있도록 화면 흐름을 재설계.',
            result: '기획 → Figma 디자인 → HTML/CSS/JS 퍼블리싱까지 전 과정을 End-to-End로 단독 주도해 완성했고, 접근성을 고려한 서비스 설계 경험을 확보.',
          },
          {
            title: '디자인 의도를 그대로 구현하는 워크플로우를 만들었다',
            problem: '디자인팀이 만든 Figma 시안과 실제 퍼블리싱 결과물 사이에 간극이 생기기 쉬운 구조라, 구현 제약을 고려하지 않은 디자인은 퍼블리싱 단계에서 재작업이 필요해지는 문제.',
            process: 'Figma 디자인을 직접 HTML/CSS/JS로 퍼블리싱하는 역할을 맡으며, 설계 단계부터 구현 가능성을 함께 고려해 디자인 의도가 그대로 화면에 반영되도록 작업.',
            result: '디자인팀-개발팀 간 소통 간극을 줄이는 협업 로직을 체득했고, 재작업 없이 디자인 의도를 화면에 정확히 구현하는 Design-to-Code 워크플로우를 확립.',
          },
        ],
        stack: {
          Frontend: ['HTML', 'CSS', 'JavaScript'],
          Design: ['Figma'],
        },
      },
    },
  },
  {
    date: '22.03 — 26.08',
    title: '경성대학교 인포넷 랩실 연구원 및 랩장',
    sub: '4년',
  },
];

const education = [
  {
    date: '2022 — 2026',
    title: '경성대학교 컴퓨터공학과',
    sub: '26.08 졸업예정',
  },
  {
    date: '2019 — 2021',
    title: '대명여자고등학교',
    sub: '졸업',
  },
];

const awards = [
  { date: '2026.06', title: '경성대학교 글로컬 아이디어 공모전', sub: '★ 대상 (총장상) ★' },
  { date: '2026.07 — 현재', title: 'DIVE 2026 - DX Challenge 해커톤', sub: '본선 진출 (진행 중) · BNK부산은행 동백전 결제 데이터 활용팀' },
  { date: '2023', title: 'IT 연합동아리 PROJECT 100일 프로젝트', sub: '디자인 & 아이디어 부문 수상' },
];

const certifications = [
  { date: '2026', title: '정보처리기사', sub: '필기 합격 · 실기 준비 중' },
  { date: '2022', title: '자동차운전면허 2종 보통', sub: '보유' },
];

const activities = [
  { year: '2026', text: '피싱스캠 예방을 위한 서비스 개발 경진대회 상위 15% / 전체 644팀' },
  { year: '2025', text: '2025 LG Aimers AI 전문가 과정 수료' },
  { year: '2025', text: '2025 LG Aimers 온라인 해커톤' },
  { year: '2025', text: 'Busan Digital Asset Nexus (Bdan) 서포터즈 2기 활동' },
  { year: '2024 — 현재', text: 'IT 연합동아리 PROJECT 운영진' },
];

function TimelineItem({ date, title, sub, delay, detail, onSelect }) {
  const itemClass = `${styles.timelineItem}${date ? '' : ` ${styles.timelineItemNoDate}`}`;
  const content = (
    <>
      {date && <span className={styles.date}>{date}</span>}
      <div>
        <div className={styles.itemTitleRow}><p className={styles.itemTitle}>{title}</p>{detail && <span className={styles.detailLink}>Details <b>→</b></span>}</div>
        <p className={styles.itemSub}>{sub}</p>
      </div>
    </>
  );

  if (detail) {
    return (
      <button
        className={`${itemClass} ${styles.timelineItemClickable} fade-up delay-${delay}`}
        onClick={() => onSelect(detail)}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={`${itemClass} fade-up delay-${delay}`}>
      {content}
    </div>
  );
}

export default function Career({ onSelectProject }) {
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
              <TimelineItem key={c.title} {...c} delay={i + 2} onSelect={onSelectProject} />
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

      {/* Awards & Honors */}
      <div className={styles.awardsWrap}>
        <h3 className={`${styles.colTitle} fade-up`}>Awards &amp; Honors</h3>
        <div className={styles.timeline}>
          {awards.map((a, i) => (
            <TimelineItem key={a.title} {...a} delay={i + 1} />
          ))}
        </div>
      </div>

      <div className={styles.certificationsWrap}>
        <h3 className={`${styles.colTitle} fade-up`}>Certifications</h3>
        <div className={styles.timeline}>
          {certifications.map((certification, i) => (
            <TimelineItem key={certification.title} {...certification} delay={i + 1} />
          ))}
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
