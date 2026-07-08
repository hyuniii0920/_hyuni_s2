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
    detail: {
      period: '2025.11 ~ 2026.01',
      role: '프론트엔드 — 멀티테넌트 SaaS 아키텍처 설계, 6계층 RBAC 라우팅, JWT 갱신 큐 패턴, B2B/B2C UX 분리 구현',
      github: 'https://github.com/hyuniii0920/mzc-lp-frontend',
      summary: '단일 SaaS 플랫폼 위에서 복수 기업 테넌트가 독립된 학습 환경을 운영하고, 기업 교육(B2B)과 개인 학습(B2C)을 단일 코드베이스로 통합 제공하는 엔터프라이즈급 LMS 프론트엔드',
      stack: {
        Frontend: ['React 19', 'TypeScript 5.6', 'Vite 6', 'TailwindCSS + CVA', 'Radix UI', 'Zustand', 'React Query', 'react-router-dom v7'],
        Backend: ['Spring Boot', 'JWT', 'MySQL / PostgreSQL', 'REST API'],
      },
      highlights: [
        {
          title: '멀티테넌트 SaaS 아키텍처',
          desc: 'hostname 기반 서브도메인 추출 → axios 인터셉터에서 X-Subdomain 헤더 자동 주입. TenantBrandingContext로 로고·컬러·파비콘을 CSS 변수에 런타임 주입. cartEnabled·communityEnabled·paidModeEnabled 기능 플래그로 테넌트별 UI 동적 제어.',
        },
        {
          title: '6계층 RBAC + B2B/B2C 이중 UX',
          desc: 'SA·TA·CO·DESIGNER·INSTRUCTOR·USER 역할별 독립 라우팅·레이아웃 구성. B2B(배정 과정·진도 중심)와 B2C(마켓플레이스·장바구니)는 tu.b2b.routes.tsx / tu.b2c.routes.tsx 파일 수준으로 완전 분리.',
        },
        {
          title: 'JWT Refresh Queue Pattern',
          desc: 'isRefreshing 플래그로 동시 refresh 중복 방지. 만료 중 실패한 요청을 failedQueue에 적재 후 refresh 완료 시 일괄 재실행 → refresh 요청 단일화, 인증 안정성 향상.',
        },
        {
          title: '자동 수강 신청 시스템',
          desc: '부서·그룹 조건 기반 AutoEnrollmentRule로 MANDATORY 과정 자동 등록. MemberPool 기반 대량 배정 + 예상 대상자 Preview 제공. 등록 완료 시 인앱·이메일 알림 자동 발송.',
        },
      ],
      decisions: [
        {
          label: 'React Query Key Factory 패턴',
          detail: '대규모 컴포넌트에서 캐시 키 충돌·invalidate 범위 오류를 차단하기 위해 도메인 단위 쿼리 키 구조화. invalidate 범위를 정밀 제어하여 과도한 리페치 감소.',
        },
        {
          label: 'CVA + TailwindCSS 디자인 시스템',
          detail: 'Class Variance Authority로 Variant를 타입 안전하게 관리. 역할별·테넌트별 UI 변형 시 스타일 분기를 최소화하고 일관된 컴포넌트 API 유지.',
        },
        {
          label: '커리큘럼 트리 다형성 노드 구조',
          detail: 'isFolder 기반 폴더/콘텐츠 분기 + parentId 기반 무한 중첩 트리 관리. dnd-kit으로 드래그 앤 드롭 정렬 지원. 과정 설계 → READY 전환 → 차수 개설 전체 흐름을 단일 트리 편집기에서 처리.',
        },
      ],
    },
  },
  {
    id: 3,
    category: 'AR · Android',
    title: 'ArtBusan',
    desc: 'QR·AR 카메라 기반 부산 미술관·박물관 전시 안내 Android 앱 — 4개국어·Offline-First',
    image: '/project_photo/ARTAR_main.png',
    detail: {
      period: '2026.04 ~ 현재 (진행 중) · 2026 관광데이터 활용 공모전 예비심사 합격',
      role: 'Android 전체 — 앱 초기 구조 설계, Glow Blue 다크 디자인 시스템, Room DB + MVVM 아키텍처 도입 (kapt → KSP 전환), 4개국어 런타임 전환 파이프라인',
      github: 'https://github.com/ghktnqns321/ArtBusan',
      summary: 'QR 코드 스캔과 AR 카메라를 결합하여 부산 미술관·박물관 작품 정보를 실시간 제공하고, 4개국어 지원과 Offline-First 설계로 인터넷이 불안정한 전시 현장에서도 끊김 없는 관람 경험을 제공하는 Android 전시 안내 플랫폼',
      stack: {
        Android: ['Kotlin + Coroutines', 'KSP', 'Jetpack Navigation', 'Single Activity', 'ListAdapter + DiffUtil', 'Coil 2.6'],
        Data: ['Room 2.7 (SQLite)', 'Retrofit 2.11 + Gson', 'SharedPreferences'],
        'AR / Camera': ['CameraX 1.4', 'ML Kit Barcode Scanning', 'Android TTS API'],
      },
      highlights: [
        {
          title: '이중 플래그 패턴 기반 QR 스캔 제어',
          desc: '@Volatile 기반 scanningEnabled(UI 전역 통제) + processingScan(추론 레이어 통제) 이중 플래그로 ML Kit의 매초 프레임 스트림에서 중복 스캔 원천 차단. 백그라운드 전용 ExecutorService로 메인 UI 스레드 블록 방지.',
        },
        {
          title: 'Offline-First 데이터 전략',
          desc: '앱 번들 내 JSON을 최초 실행 시 Room DB에 시드. runCatching { API 호출 }.getOrElse { 로컬 DB 조회 } 폴백 파이프라인으로 네트워크 단절 시에도 미술관·작품 정보 완전 유지.',
        },
        {
          title: '4개국어 런타임 전환 파이프라인',
          desc: '언어 코드를 SharedPreferences에 저장 → attachBaseContext에서 LocaleHelper로 Context 래핑 → DB deleteAll() 후 해당 언어 JSON 재시드 → Activity.recreate()로 전체 UI 일관 적용. 앱 재설치 없이 한·영·일·중 즉시 전환.',
        },
        {
          title: '4단계 폴백 QR URL 파싱 체인',
          desc: '딥링크(artar://work/{id}) → 쿼리 파라미터(?id=) → 패스 파라미터(/work/{id}) → 순수 숫자 순으로 정규식 매칭. 현장 마케팅 요구사항 변화에 유연하게 대응.',
        },
      ],
      decisions: [
        {
          label: 'kapt → KSP 전환',
          detail: 'AGP 9.0.1 환경에서 kapt가 유발하는 코틀린 버전 호환성 교착 상태를 식별하고 네이티브 심볼 프로세서 KSP로 전면 리팩토링. 빌드 안정성 및 컴파일 속도 향상.',
        },
        {
          label: 'Single Activity 아키텍처',
          detail: '다중 Activity 대비 메모리 효율 극대화. Fragment 간 상태 공유, 드로어 메뉴, 전역 네비게이션을 단일 진입점에서 일원화 관리.',
        },
        {
          label: 'BottomSheet 직접 LayoutParams 제어',
          detail: 'BottomSheetBehavior 대신 ViewGroup.LayoutParams.height 직접 핸들링. 카메라 PreviewView + 반투명 오버레이(알파 0.22 ↔ 1.0) 간 터치 이벤트 충돌 없이 정밀 오케스트레이션.',
        },
      ],
    },
  },
  {
    id: 4,
    category: 'Mobile · 대상 수상',
    title: 'PIYAK(dansynkpop)',
    desc: 'K-pop 아이돌 안무 연습 모바일 앱 — 2026 글로컬 Innovation Challenge Day 대상 (총장상)',
    image: '/project_photo/piyak_main.png',
    detail: {
      period: '2026 글로컬 Innovation Challenge Day · 대상 (총장상)',
      role: 'AI 웹 툴 개발 — Instance Segmentation 기반 멤버별 마스크 영상 생성 파이프라인, Django REST 백엔드 연동, 영상 저장·서빙 인프라 설계',
      summary: 'K-pop 아이돌 안무 원본 영상에서 AI로 멤버 각각을 픽셀 단위 인식·추적하여 멤버별 마스크 영상을 자동 생성하는 반자동화 파이프라인을 구현하고, 이를 모바일 앱의 연습 콘텐츠로 제공하는 인프라까지 담당',
      stack: {
        'AI · 영상처리': ['SAM2 (Segment Anything Model 2)', 'Mask Extraction', 'Video Processing'],
        백엔드: ['Python', 'Django REST Framework'],
        인프라: ['Cloudflare R2', 'PeerTube', 'Oracle Cloud (Ubuntu)'],
      },
      highlights: [
        {
          title: 'SAM2 기반 멤버별 마스크 영상 생성',
          desc: 'Meta SAM2(Segment Anything Model 2)의 비디오 세그멘테이션으로 멤버별 마스크 영상 생성. 웹 툴에서 작업자가 첫 프레임에 포인트/박스로 멤버를 지정하면, SAM2 내장 메모리 메커니즘이 이후 프레임을 자동 추적하며 픽셀 단위 마스크를 전파. 프레임별 마스크를 연결해 멤버별 마스크 영상으로 완성.',
        },
        {
          title: 'Django REST 백엔드 연동',
          desc: 'SongIdolMembership 모델과 연동하여 곡별·멤버별 마스크 영상 메타데이터를 DB 저장. PracticeVideo 모델로 모바일 앱에 연습 영상 제공. piyak 토큰 기반 결제 시스템과 연결하여 멤버별 영상 잠금 해제 기능까지 연동.',
        },
        {
          title: '영상 저장 및 스트리밍 인프라',
          desc: '생성된 마스크 영상을 Cloudflare R2(S3 호환)에 저장. PeerTube 기반 스트리밍 인프라로 모바일 앱에 서빙. Django가 PeerTube API와 통신하여 스트리밍 URL을 동적으로 resolve.',
        },
        {
          title: '반자동화 마스크 제작 워크플로우',
          desc: 'SAM2의 비디오 추적 특성을 활용한 반자동화 파이프라인. 웹 툴 내 멤버 지정 UI → SAM2 프레임 전파 → 마스크 추출 → 마스크 영상 생성까지 일관된 흐름으로, 매 프레임 수동 편집 없이 멤버별 콘텐츠 제작 가능.',
        },
      ],
      decisions: [
        {
          label: 'SAM2 선택 — 비디오 네이티브 추적',
          detail: '다인 안무에서 멤버 간 겹침으로 완전 자동 감지 오류가 누적되는 문제를 보완하기 위해 SAM2 채택. SAM2는 비디오 세그멘테이션을 네이티브 지원하여 첫 프레임 포인트/박스 지정만으로 이후 프레임 전체에 마스크가 자동 전파됨. 별도 tracker 없이 정확도·생산성 동시 확보.',
        },
        {
          label: 'Cloudflare R2 + PeerTube 분리',
          detail: '영상 저장(R2)과 스트리밍(PeerTube)을 분리하여 각 역할에 최적화된 인프라 구성. Django가 PeerTube API로 스트리밍 URL을 동적 resolve하는 방식으로 모바일 앱과 느슨하게 결합.',
        },
        {
          label: '콘텐츠 접근 토큰 시스템 연동',
          detail: '멤버별 마스크 영상을 piyak 토큰 기반 결제와 연결하여 잠금 해제 단위를 멤버 단위로 세분화. DB 설계 단계에서 PracticeVideo 모델에 접근 권한 메타데이터를 포함하여 백엔드 단일 조회로 권한 판단.',
        },
      ],
    },
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
