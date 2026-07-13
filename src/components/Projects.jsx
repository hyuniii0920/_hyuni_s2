import { useScrollFade } from '../hooks/useScrollFade';
import styles from './Projects.module.css';

export const featured = [
  {
    id: 1,
    category: 'AI · Web',
    title: 'CLAIR-AI',
    desc: 'Gemini·LangChain 기반 AI 계약서 분석 서비스',
    image: '/project_photo/clair_main.png',
    detail: {
      period: '2026.03 ~ 2026.06',
      role: '백엔드 · AI — FastAPI 서버 설계, AI 분석 파이프라인 설계·구현, 위험도 자동 채점 알고리즘, DB 스키마 설계',
      github: [
        { label: 'clair-ai', url: 'https://github.com/KS-LEXA/clair-ai' },
        { label: 'clair-backend', url: 'https://github.com/KS-LEXA/clair-backend' },
        { label: 'clair-frontend', url: 'https://github.com/KS-LEXA/clair-frontend' },
      ],
      summary: 'OCR · LLM · RAG 파이프라인을 결합하여 법률 지식 없이도 계약서의 위험 조항을 자동으로 탐지하고, 안전도 점수와 근거 조항을 함께 제공하는 한국어 계약서 분석 플랫폼',
      motivation: '프리랜서·소상공인 등 법률 비전문가는 계약서의 위험 조항을 스스로 판별하기 어렵고, 매번 변호사 자문을 받기엔 비용과 시간 부담이 크다는 문제의식에서 출발. OCR로 계약서를 텍스트화하고 LLM·RAG로 위험 조항을 자동 탐지·설명해, 비전문가도 계약서 리스크를 직접 확인할 수 있는 서비스를 목표로 기획.',
      whyShort: '법률 비전문가도 변호사 자문 없이 계약서 위험을 스스로 확인할 수 있게 만들었다.',
      myStack: ['FastAPI', 'MySQL 8', 'Google Gemini', 'ChromaDB'],
      card: {
        name: 'CLAIR',
        tagline: 'AI 계약서 분석 서비스',
        desc: '계약서의 위험 조항을 자동 분석하고\n관련 법률 근거를 함께 제공하는 AI 서비스',
        checklist: [
          'OCR 처리 속도 8배 개선',
          'RAG 기반 법률 정보 검색',
          'LLM 기반 계약서 분석',
        ],
      },
      problemSolving: [
        {
          title: '들쭉날쭉하던 AI 채점 결과를 일관되게 만들었다',
          problem: 'LLM에게 위험도 점수를 직접 매기게 하면 동일한 조항에도 매번 다른 점수가 나오는 비일관성 문제가 있었고, 채점 근거를 재현할 수 없어 서비스 신뢰도에 영향을 줄 수 있었음.',
          process: '채점 로직을 AI가 아닌 백엔드로 이관하기로 결정하고, LLM은 severity_score·confidence 값만 Enum 제한 JSON으로 반환하도록 프롬프트를 재설계. 백엔드에서 severity × confidence × 카테고리 가중치로 감점하고, 고위험 조항 3개 이상 시 추가 패널티를 적용하는 100점 기준 알고리즘을 구현.',
          result: '동일 계약서를 다시 분석해도 항상 동일한 점수가 나오는 재현 가능한 채점 체계를 확보했고, 감점 기준을 조정할 때도 모델 재학습 없이 백엔드 상수만 수정하면 되어 정책 대응 속도가 빨라짐.',
        },
        {
          title: 'AI 답변의 근거를 조항 단위로 추적 가능하게 했다',
          problem: '계약서 조항이 JSON 통짜 컬럼으로 저장돼 있어, RAG로 생성한 Q&A 답변이 실제로 어느 조항을 근거로 했는지 역추적할 수 없었고 프론트에서 근거 조항 하이라이트도 불가능했음.',
          process: 'DB 스키마를 조항 단위 행으로 정규화(contract_clauses 테이블 분리)하고, RAG 응답에 evidence_clause_ids 필드를 추가해 JOIN으로 근거 조항 원문을 조회할 수 있도록 재구성.',
          result: 'Q&A 답변마다 근거가 된 실제 조항 원문을 프론트에서 실시간 하이라이트로 제공할 수 있게 되어, AI 답변을 사용자가 직접 검증할 수 있는 근거 기반 UX를 완성.',
        },
        {
          title: '장시간 분석에도 끊기지 않는 안정적인 구조를 만들었다',
          problem: 'FastAPI BackgroundTask에서 Request 스코프 DB 세션을 그대로 사용했더니, Request가 끝나면 세션도 만료되어 오래 걸리는 분석 작업 도중 DB 접근 오류가 발생.',
          process: '세션 라이프사이클이 Request와 BackgroundTask 간에 어긋난다는 점을 원인으로 파악하고, BackgroundTask 내부에서 SessionLocal()을 독립적으로 생성해 try/finally로 명시 관리하도록 리팩토링.',
          result: '수 분 이상 걸리는 분석 작업에서도 DB 오류 없이 안정적으로 완료되도록 개선했고, 5단계 상태머신과 결합해 사용자에게 정확한 진행 상태를 보여줄 수 있게 됨.',
        },
        {
          title: '외부 AI 장애에도 서비스가 멈추지 않게 했다',
          problem: '8단계 AI 파이프라인이 외부 LLM API(Gemini)에 전적으로 의존하고 있어, Gemini 장애나 타임아웃이 발생하면 파이프라인 전체가 멈추는 단일 장애점(SPOF)이 존재했음.',
          process: '장애 발생 시나리오를 정의하고, Gemini 호출부에 9대 위험 유형 키워드 매칭 기반 폴백 로직을 추가해 API 실패 시 자동으로 전환되도록 구현.',
          result: 'Gemini 장애 상황에서도 파이프라인이 중단 없이 끝까지 실행되어 서비스 가용성을 확보.',
        },
      ],
      stack: {
        Frontend: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Radix UI'],
        Backend: ['FastAPI', 'SQLAlchemy 2.x', 'MySQL 8', 'JWT + OAuth2', 'BCrypt'],
        AI: ['EasyOCR', 'Google Gemini', 'ChromaDB', 'Gemini Embedding', 'law.go.kr API'],
      },
      highlights: [
        {
          title: '위험도 자동 채점 알고리즘 (Safety Score)',
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
    desc: 'B2B 기업교육에 특화된 엔터프라이즈급 멀티테넌트 SaaS 학습관리시스템(LMS) — 관리자 콘솔부터 B2B/B2C 사용자 화면까지 지원',
    image: '/project_photo/MZC_LP_main.png',
    detail: {
      period: '2025.11 ~ 2026.01',
      role: '프론트엔드 — MSA 기반 멀티테넌트 아키텍처 설계, 6개 직급 통합 라우팅, JWT 갱신 큐 패턴, B2B/B2C UX 분리 구현',
      github: 'https://github.com/hyuniii0920/mzc-lp-frontend',
      summary: '단일 SaaS 플랫폼 위에서 복수 기업 테넌트가 독립된 학습 환경을 운영하고, 기업 교육(B2B)과 개인 학습(B2C)을 단일 코드베이스로 통합 제공하는 엔터프라이즈급 LMS 프론트엔드',
      motivation: '기업마다 별도의 LMS를 도입하면 구축·유지보수 비용이 크고, 기존 LMS 대부분이 기업교육(B2B)이나 개인학습(B2C) 한쪽에만 최적화돼 있어 두 시장을 동시에 대응하기 어렵다는 문제의식에서 출발. 단일 코드베이스에서 호스트네임만으로 테넌트를 구분하고 B2B/B2C UX를 모두 지원하는 멀티테넌트 SaaS LMS를 목표로 설계.',
      whyShort: '기업마다 LMS를 따로 도입하는 비용 문제를 하나의 멀티테넌트 플랫폼으로 해결했다.',
      myStack: ['React 19', 'TypeScript 5.6', 'Zustand', 'Figma AI'],
      card: {
        name: 'MZC',
        tagline: 'B2B 엔터프라이즈 LMS',
        desc: '기업 교육과 개인 학습을 함께 지원하는\n멀티테넌트 SaaS 학습관리시스템',
        checklist: [
          '6개 직급을 하나의 프론트엔드로 통합',
          '테넌트 추가 시 코드 수정 없이 온보딩',
          'JWT 동시 요청 인증 오류 제거',
        ],
      },
      problemSolving: [
        {
          title: '테넌트가 늘어나도 코드 수정 없이 대응하게 만들었다',
          problem: '복수 기업 테넌트가 단일 코드베이스를 공유하는데, 테넌트마다 로고·컬러·활성화 기능(장바구니, 커뮤니티, 유료 모드 등)이 달라야 해서 이를 하드코딩하면 테넌트가 추가될 때마다 조건 분기가 기하급수적으로 늘어나는 문제.',
          process: 'hostname 기반 서브도메인을 추출해 axios 인터셉터에서 X-Subdomain 헤더를 자동 주입하도록 구현하고, TenantBrandingContext로 로고·컬러·파비콘을 CSS 변수에 런타임 주입. cartEnabled·communityEnabled·paidModeEnabled 등 기능 플래그로 테넌트별 UI를 동적 제어하도록 재설계.',
          result: '신규 테넌트를 온보딩할 때 코드 수정 없이 설정값만 추가하면 되는 구조를 확보했고, 브랜딩·기능 변경도 재배포 없이 런타임에서 즉시 반영 가능해짐.',
        },
        {
          title: '동시 요청에도 끊기지 않는 로그인 상태를 만들었다',
          problem: '액세스 토큰 만료 시점에 여러 API 요청이 동시에 나가면 각 요청이 개별적으로 refresh를 시도해 refresh 요청이 중복 발생하고, 서버에서 토큰 상태가 꼬여 인증이 깨지는 문제가 있었음.',
          process: 'axios 인터셉터를 isRefreshing 플래그로 재설계해 이미 refresh가 진행 중이면 새 요청은 failedQueue에 적재만 하고 대기하도록 하고, refresh가 완료되면 큐에 쌓인 요청을 일괄 재실행하는 큐 패턴을 구현.',
          result: '동시다발적 요청 상황에서도 refresh 요청이 단 한 번만 발생하도록 개선되어 인증 안정성을 확보하고, 사용자가 토큰 만료를 체감하지 못하는 끊김 없는 세션을 유지하게 됨.',
        },
        {
          title: '6개 직급을 하나의 프론트엔드로 통합했다',
          problem: '기업교육(B2B, 배정 과정 중심)과 개인학습(B2C, 마켓플레이스 중심)은 화면 흐름 자체가 다른데, 여기에 SA·TA·CO·DESIGNER·INSTRUCTOR·USER 6개 직급별 접근 권한까지 겹치면서 단일 구조로는 유지보수가 어려워지는 문제.',
          process: 'B2B/B2C 라우팅을 tu.b2b.routes.tsx / tu.b2c.routes.tsx 파일 수준으로 분리하되, 6개 직급이 하나의 프론트엔드 코드베이스 위에서 각자의 화면·레이아웃으로 독립 동작하도록 통합 설계. 모듈은 직급별로 나누고 진입점만 분기해, 조건부 렌더링 없이 진입 시점에 흐름이 갈리도록 구성.',
          result: '6개 직급이 각자 다른 화면을 쓰면서도 하나의 프론트엔드로 관리되는 구조를 확보해, 신규 직급이나 플로우를 추가할 때 기존 코드를 건드리지 않고 파일만 추가하면 되도록 정리.',
        },
        {
          title: '불필요한 재요청을 없애 화면 반응 속도를 높였다',
          problem: '대규모 컴포넌트 트리에서 각자 임의로 쿼리 키를 만들어 쓰다 보니 캐시 키가 충돌하거나 invalidate 범위를 잘못 잡아, 관련 없는 데이터까지 리페치되거나 갱신돼야 할 데이터가 갱신되지 않는 문제가 반복됐음.',
          process: '도메인 단위로 쿼리 키를 구조화하는 Key Factory 패턴을 도입해 캐시 키 생성 규칙을 통일하고, invalidate 범위를 계층적으로 제어할 수 있도록 데이터 패칭 로직을 재설계.',
          result: 'invalidate 범위를 정밀하게 통제할 수 있게 되어 불필요한 리페치가 줄었고, 캐시 관련 버그가 재발하지 않는 일관된 데이터 패칭 구조를 확보.',
        },
      ],
      stack: {
        Frontend: ['React 19', 'TypeScript 5.6', 'Vite 6', 'TailwindCSS + CVA', 'Radix UI', 'Zustand', 'React Query', 'react-router-dom v7'],
        Backend: ['Spring Boot', 'JWT', 'MySQL / PostgreSQL', 'REST API'],
        Design: ['Figma', 'Figma AI'],
      },
      highlights: [
        {
          title: '멀티테넌트 SaaS 아키텍처',
          desc: 'hostname 기반 서브도메인 추출 → axios 인터셉터에서 X-Subdomain 헤더 자동 주입. TenantBrandingContext로 로고·컬러·파비콘을 CSS 변수에 런타임 주입. cartEnabled·communityEnabled·paidModeEnabled 기능 플래그로 테넌트별 UI 동적 제어.',
        },
        {
          title: '6개 직급 통합 + B2B/B2C 이중 UX',
          desc: '기업 관리자(SA·TA)용 콘솔부터 CO·DESIGNER·INSTRUCTOR·USER까지 6개 직급별 독립 라우팅·레이아웃을 하나의 프론트엔드로 통합 구성. B2B(배정 과정·진도 중심)와 B2C(마켓플레이스·장바구니)는 tu.b2b.routes.tsx / tu.b2c.routes.tsx 파일 수준으로 완전 분리.',
        },
        {
          title: 'AI 기반 UI 설계 및 테넌트별 개별화',
          desc: 'Figma AI로 디자인 문서를 생성하고 화면 시뮬레이션을 거쳐 UI 설계 단계부터 AI를 적극 활용. 이렇게 설계한 프론트 레이어를 테넌트별로 로고·컬러·기능을 개별 커스터마이징할 수 있도록 구조화.',
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
    category: 'Mobile · 대상 수상',
    title: 'PIYAK(dansynkpop)',
    desc: 'K-pop 아이돌 안무 연습 모바일 앱 — 2026 글로컬 Innovation Challenge Day 대상 (총장상)',
    image: '/project_photo/piyak_main.png',
    detail: {
      period: '2026 글로컬 Innovation Challenge Day · 대상 (총장상)',
      role: 'AI 웹 툴 개발 — Instance Segmentation 기반 멤버별 마스크 영상 생성 파이프라인, Django REST 백엔드 연동, 영상 저장·서빙 인프라 설계',
      summary: 'K-pop 아이돌 안무 원본 영상에서 AI로 멤버 각각을 픽셀 단위 인식·추적하여 멤버별 마스크 영상을 자동 생성하는 반자동화 파이프라인을 구현하고, 이를 모바일 앱의 연습 콘텐츠로 제공하는 인프라까지 담당',
      motivation: 'K-pop 안무를 연습하려는 팬들은 여러 멤버가 함께 등장하는 원본 영상에서 특정 한 명의 동선만 따라 익히기 어렵고, 멤버별 영상을 일일이 수작업으로 편집해 제공하기엔 곡 수·멤버 수가 늘어날수록 제작 비용이 감당하기 어렵다는 문제의식에서 출발. AI 기반 영상 세그멘테이션으로 멤버별 마스크 영상을 반자동으로 생성해 안무 연습 콘텐츠로 서비스하는 것을 목표로 기획.',
      whyShort: '다인 그룹 영상에서 멤버별 동선을 따라 연습하기 어려웠던 문제를 자동화로 해결했다.',
      myStack: ['SAM2 (Segment Anything Model 2)', 'Django REST Framework', 'Cloudflare R2', 'PeerTube'],
      card: {
        name: 'PIYAK',
        tagline: 'K-pop 안무 연습 앱 · 대상 수상',
        desc: 'AI로 멤버별 마스크 영상을 자동 생성해\n안무 연습 콘텐츠로 제공하는 모바일 앱',
        checklist: [
          'SAM2 기반 멤버별 자동 추적',
          '수작업 편집 없는 반자동화 파이프라인',
          '2026 글로컬 Innovation Challenge Day 대상',
        ],
      },
      problemSolving: [
        {
          title: '겹치는 다인 안무에서도 멤버를 정확히 추적하게 했다',
          problem: '다인 K-pop 안무 영상은 멤버들이 자주 겹치고 대형이 바뀌기 때문에, 프레임마다 완전 자동으로 멤버를 감지·추적하게 하면 겹침 구간에서 멤버가 뒤바뀌거나 인식이 끊기는 오류가 누적되는 문제.',
          process: '완전 자동 감지 대신, 웹 툴에서 작업자가 첫 프레임에 포인트/박스로 멤버를 한 번만 지정하면 SAM2의 비디오 세그멘테이션 메모리 메커니즘이 이후 프레임을 자동 추적하며 픽셀 단위 마스크를 전파하도록 파이프라인을 설계.',
          result: '멤버 간 겹침 구간에서도 안정적으로 동일 인물을 추적할 수 있게 됐고, 별도의 다중 객체 트래커 없이 SAM2 하나로 정확도와 제작 생산성을 동시에 확보.',
        },
        {
          title: '멤버 단위 접근 권한을 백엔드 단일 조회로 처리했다',
          problem: '생성된 멤버별 마스크 영상을 곡·멤버 단위로 관리하고, 유료 콘텐츠라면 멤버 단위로 잠금을 해제하는 결제 로직까지 앱에 연결해야 했는데, 초기에는 이 메타데이터와 접근 권한을 연결할 데이터 모델이 없었음.',
          process: 'SongIdolMembership 모델로 곡별·멤버별 마스크 영상 메타데이터를 저장하고, PracticeVideo 모델을 통해 모바일 앱에 연습 영상을 제공하도록 Django REST 백엔드를 설계. piyak 토큰 기반 결제 시스템과 연동해 멤버 단위로 접근 권한을 판단하도록 구현.',
          result: '곡·멤버 단위로 연습 영상과 접근 권한을 단일 조회로 판단할 수 있는 구조를 확보해, 멤버별 콘텐츠 잠금 해제 기능을 별도 로직 없이 백엔드 단일 조회로 처리 가능해짐.',
        },
        {
          title: '저장과 스트리밍을 분리해 독립적으로 확장 가능하게 했다',
          problem: '생성된 멤버별 마스크 영상은 용량이 크고 수가 많아, 저장과 스트리밍을 하나의 인프라에 결합하면 트래픽이 몰릴 때 저장소와 스트리밍 서버가 서로 영향을 주는 구조적 위험이 있었음.',
          process: '영상 저장은 Cloudflare R2(S3 호환)에, 스트리밍은 PeerTube 기반 인프라에 각각 맡기고 Django가 PeerTube API와 통신해 스트리밍 URL을 동적으로 resolve하도록 역할을 분리.',
          result: '저장과 스트리밍이 서로 독립적으로 확장 가능한 구조를 확보했고, 모바일 앱은 Django를 통해 항상 최신 스트리밍 URL로 안정적으로 영상을 재생.',
        },
        {
          title: '수작업 편집 없이 멤버별 콘텐츠 제작을 자동화했다',
          problem: '멤버별 마스크 영상을 프레임마다 수동으로 편집해 제작하면 곡 하나당 작업 시간이 과도하게 길어져, 서비스에 필요한 만큼의 콘텐츠 양을 감당할 수 없는 문제.',
          process: '웹 툴 내 멤버 지정 UI → SAM2 프레임 전파 → 마스크 추출 → 마스크 영상 생성까지 이어지는 일관된 반자동화 워크플로우를 설계해, 작업자는 첫 프레임 지정만 하면 되도록 구성.',
          result: '매 프레임 수동 편집 없이 멤버별 콘텐츠를 제작할 수 있게 되어 대회 시연에 필요한 콘텐츠 제작 생산성을 확보했고, 이 반자동화 파이프라인이 대상 수상의 핵심 근거가 됨.',
        },
      ],
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
  {
    id: 4,
    category: 'AR · Android',
    title: 'ArtBusan',
    desc: 'QR·AR 카메라 기반 부산 미술관·박물관 전시 안내 Android 앱 — 4개국어·Offline-First',
    image: '/project_photo/ARTAR_main.png',
    detail: {
      period: '2026.04 ~ 현재 (진행 중) · 2026 관광데이터 활용 공모전 예비심사 합격',
      role: 'Android 전체 — 앱 초기 구조 설계, Glow Blue 다크 디자인 시스템, Room DB + MVVM 아키텍처 도입 (kapt → KSP 전환), 4개국어 런타임 전환 파이프라인',
      github: 'https://github.com/ghktnqns321/ArtBusan',
      summary: 'QR 코드 스캔과 AR 카메라를 결합하여 부산 미술관·박물관 작품 정보를 실시간 제공하고, 4개국어 지원과 Offline-First 설계로 인터넷이 불안정한 전시 현장에서도 끊김 없는 관람 경험을 제공하는 Android 전시 안내 플랫폼',
      motivation: '전시장에서 배포되는 종이 안내 책자나 오디오 가이드는 다국어 지원이 제한적이고, Wi-Fi가 불안정한 실내 전시 공간에서는 앱 기반 안내 서비스도 끊기기 쉽다는 문제의식에서 출발. 부산 관광데이터를 활용해 QR·AR 기반으로 작품 정보를 제공하면서도 오프라인에서 완전히 동작하는 다국어 전시 안내 앱을 목표로 기획.',
      whyShort: '다국어 지원이 부족하고 전시장 Wi-Fi가 불안정해도 끊기지 않는 안내 서비스를 만들었다.',
      myStack: ['Kotlin + Coroutines', 'Room 2.7 (SQLite)', 'CameraX 1.4', 'ML Kit Barcode Scanning'],
      card: {
        name: 'ArtBusan',
        tagline: 'AR 전시 안내 Android 앱',
        desc: 'QR·AR로 작품 정보를 제공하고\n오프라인에서도 끊김 없이 동작하는 전시 앱',
        checklist: [
          '4개국어 즉시 전환 (재설치 불필요)',
          'Offline-First로 네트워크 단절 대응',
          'QR 중복 스캔 원천 차단',
        ],
      },
      problemSolving: [
        {
          title: 'QR 중복 인식을 없애 끊김 없는 스캔을 만들었다',
          problem: 'ML Kit 바코드 스캐너가 카메라 프리뷰의 매초 프레임 스트림을 분석하다 보니, 사용자가 QR 코드에 카메라를 잠깐만 대고 있어도 짧은 시간에 같은 QR을 수십 번 인식해 작품 상세 화면이 중복으로 열리는 문제가 있었음.',
          process: '@Volatile 변수로 scanningEnabled(UI 전역 통제)와 processingScan(추론 레이어 통제) 두 개의 플래그를 두어 스캔 요청과 실제 추론 처리를 이중으로 차단하도록 설계하고, 인식 로직을 백그라운드 전용 ExecutorService로 분리해 메인 UI 스레드가 블록되지 않도록 구현.',
          result: '동일 QR 코드를 짧게 여러 프레임 인식해도 중복 화면 전환이 발생하지 않게 됐고, 스캔 처리가 백그라운드에서 이뤄져 카메라 프리뷰가 끊기지 않는 부드러운 스캔 UX를 확보.',
        },
        {
          title: '네트워크가 끊겨도 멈추지 않는 오프라인 구조를 만들었다',
          problem: '미술관·박물관 내부는 벽·전시 구조물로 인해 Wi-Fi/LTE 신호가 불안정한 경우가 많아, 서버 API 호출에만 의존하면 작품 정보 조회가 끊기거나 실패하는 문제.',
          process: '앱 최초 실행 시 번들에 포함된 JSON을 Room DB에 시드하고, 이후 조회는 runCatching { API 호출 }.getOrElse { 로컬 DB 조회 }로 감싸 네트워크 실패 시 자동으로 로컬 데이터로 폴백하도록 구현.',
          result: '네트워크가 완전히 끊긴 전시장 내부에서도 미술관·작품 정보를 끊김 없이 제공할 수 있게 되어, 공모전 심사에서 요구하는 실사용 안정성 기준을 충족.',
        },
        {
          title: '재설치 없이 4개국어를 즉시 전환하게 만들었다',
          problem: '외국인 관광객을 포함한 4개국어(한·영·일·중) 사용자를 지원해야 했는데, 언어별로 앱을 따로 배포하거나 재설치를 요구하면 현장에서 즉시 언어를 바꿔야 하는 관람객 경험에 맞지 않는 문제.',
          process: '선택한 언어 코드를 SharedPreferences에 저장하고 attachBaseContext에서 LocaleHelper로 Context를 언어별로 래핑하도록 구현. 언어 전환 시 DB를 deleteAll()한 뒤 해당 언어 JSON을 재시드하고 Activity.recreate()로 전체 UI를 일관되게 갱신.',
          result: '앱 재설치나 재배포 없이 한·영·일·중 4개 언어를 현장에서 즉시 전환할 수 있게 되어 외국인 관광객 대응력을 확보.',
        },
        {
          title: 'QR 포맷이 바뀌어도 재배포 없이 대응하게 했다',
          problem: '현장 마케팅팀이 QR 코드에 인코딩하는 URL 포맷(딥링크, 쿼리 파라미터, 패스 파라미터 등)을 운영 중에 바꾸는 경우가 있어, 단일 포맷만 파싱하도록 하드코딩하면 QR 코드가 재발급될 때마다 앱을 다시 배포해야 하는 문제.',
          process: '딥링크(artar://work/{id}) → 쿼리 파라미터(?id=) → 패스 파라미터(/work/{id}) → 순수 숫자 순으로 정규식 매칭을 시도하는 4단계 폴백 파싱 체인을 설계.',
          result: 'QR 코드 포맷이 바뀌어도 앱 재배포 없이 대응 가능해졌고, 현장 마케팅 요구사항 변화에 유연하게 대응할 수 있는 구조를 확보.',
        },
      ],
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
    id: 5,
    category: 'Security · AI',
    title: 'Smishing Prevention AI',
    desc: '스미싱 피해 사례 분석 기반 안드로이드·웹 통합 예방 서비스 — 피싱스캠 예방 서비스 개발 경진대회 상위 15% (전체 644팀)',
    image: '/project_photo/SPAI_main.png',
    detail: {
      period: '2026 · 피싱스캠 예방 서비스 개발 경진대회 (상위 15% / 전체 644팀)',
      role: '웹 프론트엔드 개발 · 백엔드 연동 — Firebase 기반 인증·데이터 관리 구조 설계, 프론트/백엔드 배포 자동화, Android 앱-웹 플랫폼 간 공통 데이터 흐름 설계',
      summary: '스미싱 문자 피해 사례를 분석해 탐지 결과를 제공하는 서비스 화면을 담당한 안드로이드·웹 통합형 스미싱 예방 서비스',
      motivation: '스미싱 문자로 인한 금전 피해 사례가 계속 늘고 있지만, 사용자가 스스로 위험 문자를 판별하기는 어렵다는 문제의식에서 출발. 그 문제를 직접 풀어보고 싶어 피싱스캠 예방 서비스 개발 경진대회에 참가해 스미싱 피해 사례를 분석했고, 644개 참가팀 중 상위 15%에 들었습니다.',
      whyShort: '사용자가 스스로 판별하기 어려운 스미싱 위험 문자를 자동으로 탐지하게 만들었다.',
      card: {
        name: 'SPAI',
        tagline: '스미싱 예방 안드로이드·웹 서비스',
        desc: '스미싱 피해 사례를 분석해 탐지 결과를\n앱과 웹에서 함께 제공하는 통합 예방 서비스',
        checklist: [
          '피싱스캠 예방 경진대회 상위 15%',
          '3개 서비스 모노레포로 배포 단순화',
          'Firebase 기반 인증·데이터 통합',
        ],
      },
      myStack: ['React', 'Spring Boot', 'Firebase Auth', 'GitHub Actions'],
      problemSolving: [
        {
          title: '3개 서비스를 하나로 통합해 배포 구조를 단순화했다',
          problem: 'Android 앱, React 프론트엔드, Spring Boot 백엔드를 각각 별도로 관리하면 탐지 결과를 화면에 반영하는 과정에서 API 스펙이 어긋나거나 배포 버전이 서로 맞지 않는 문제가 발생하기 쉬웠음.',
          process: '세 서비스를 하나의 모노레포로 통합 관리하도록 구조를 설계하고, GitHub Actions로 프론트엔드/백엔드 배포 워크플로우를 개별적으로 자동화.',
          result: '협업 및 배포 구조가 단순화됐고, 시크릿 기반 배포 환경을 정리해 배포 안정성을 확보.',
        },
        {
          title: '앱과 웹에서 동일한 탐지 결과를 보여주게 했다',
          problem: '스미싱 탐지 결과를 모바일과 웹에서 동시에 확인할 수 있어야 했는데, 플랫폼별로 인증·데이터 구조가 분리되어 있으면 사용자가 앱과 웹에서 같은 분석 결과를 일관되게 볼 수 없는 문제.',
          process: 'Firebase Auth/Firestore/Storage와 Firebase Admin SDK를 기반으로 인증·데이터 관리 구조를 통합 설계하고, Android 앱과 웹 플랫폼이 공유하는 공통 데이터 흐름을 구성.',
          result: '멀티플랫폼으로 확장 가능한 인증·데이터 구조를 확보해 모바일과 웹 간 연계성을 높였고, 피싱스캠 예방 서비스 개발 경진대회에서 전체 644팀 중 상위 15%를 기록.',
        },
      ],
      stack: {
        Android: ['Kotlin'],
        Frontend: ['React', 'Vite'],
        Backend: ['Spring Boot', 'Java 21'],
        Infra: ['Firebase Auth', 'Firestore', 'Firebase Storage', 'Firebase Admin SDK', 'GitHub Actions'],
      },
      highlights: [
        {
          title: '모노레포 기반 통합 관리',
          desc: 'Android 앱, React 프론트엔드, Spring Boot 백엔드를 하나의 모노레포로 관리해 협업 및 배포 구조 단순화.',
        },
        {
          title: 'Firebase 기반 인증·데이터 파이프라인',
          desc: 'Firebase Auth/Firestore/Storage와 Firebase Admin SDK를 활용해 인증 및 데이터 처리 파이프라인 구축.',
        },
        {
          title: '보안 분석 결과 시각화 화면',
          desc: 'React 기반 웹 UI를 통해 스미싱 탐지·보안 분석 정보와 사용자 데이터를 시각적으로 확인할 수 있는 화면 구조 구현.',
        },
        {
          title: '배포 자동화',
          desc: 'GitHub Actions를 이용해 프론트엔드/백엔드 개별 배포 워크플로우를 자동화하고 시크릿 기반 배포 환경 정리.',
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
              {p.detail?.card ? (
                <>
                  <h3 className={styles.featuredCardName}>{p.detail.card.name}</h3>
                  <span className={styles.featuredCardTagline}>{p.detail.card.tagline}</span>
                  <p className={styles.featuredCardDesc}>{p.detail.card.desc}</p>
                  <div className={styles.featuredCardDivider} />
                  <ul className={styles.featuredCardChecklist}>
                    {p.detail.card.checklist.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <span className={styles.featuredCategory}>{p.category}</span>
                  <h3 className={styles.featuredTitle}>{p.title}</h3>
                  <p className={styles.featuredDesc}>{p.desc}</p>
                  {p.detail?.whyShort && (
                    <p className={styles.featuredWhy}>{p.detail.whyShort}</p>
                  )}
                  {p.detail?.myStack && (
                    <div className={styles.featuredTechRow}>
                      {p.detail.period && (
                        <span className={styles.featuredYear}>{p.detail.period.split(' ')[0]}</span>
                      )}
                      {p.detail.myStack.slice(0, 3).map(tag => (
                        <span key={tag} className={styles.featuredTechTag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </>
              )}
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
