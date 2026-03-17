# GCMediAI 회사소개 홈페이지

## 프로젝트 개요

GCMediAI 회사소개 홈페이지 리뉴얼 프로젝트.

**비전**: Beyond EMR, Toward Medical OS

**페이지 구성**:
- 메인 (/)
- 회사소개 (/about)
- 사업분야 (/business)
- IR (/ir) — 주가정보, 재무정보, 공시자료, 주주공고, NEWS
- 문의하기 (/contact)

## 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **UI 라이브러리**: React 19
- **스타일링**: SCSS
- **서버 상태**: TanStack Query
- **패키지 매니저**: pnpm
- **배포**: Vercel

## 폴더 구조

```
src/
├── app/          # App Router 페이지 및 레이아웃
├── components/   # 재사용 컴포넌트
│   ├── ui/       # 기본 UI 컴포넌트 (버튼, 카드 등)
│   ├── layout/   # 레이아웃 컴포넌트 (헤더, 푸터 등)
│   └── sections/ # 페이지 섹션 컴포넌트
├── lib/          # 유틸리티, API 클라이언트, 상수
├── styles/       # 글로벌 CSS
└── types/        # TypeScript 타입/인터페이스
public/           # 정적 에셋
docs/             # 기획 문서
```

## 코딩 컨벤션

### 네이밍 규칙
- **컴포넌트**: PascalCase — `HeroSection.tsx`, `BusinessCard.tsx`
- **유틸리티/훅**: camelCase — `useScrollAnimation.ts`, `formatDate.ts`
- **타입/인터페이스**: PascalCase, `I` 접두사 없음 — `BusinessArea` (not `IBusinessArea`)
- **상수**: UPPER_SNAKE_CASE — `SITE_NAME`, `API_BASE_URL`
- **디렉토리**: kebab-case — `business-area/`, `hero-section/`

### 컴포넌트 작성
- 파일 하나에 default export 컴포넌트 하나
- Server Component 우선 사용, 클라이언트 인터랙션이 필요한 경우에만 `'use client'` 선언
- 한국어 주석 사용

### 포맷팅 규칙
- 싱글따옴표(`'`) 사용 — 문자열, import 경로 모두
- 들여쓰기 2칸 (스페이스)
- 세미콜론 사용

### 스타일링 규칙
- SCSS 사용 — 컴포넌트별 `.scss` 파일 작성
- CSS 클래스명 camelCase 사용 — `heroSection`, `cardWrapper` 등
- 인라인 스타일 금지

## 금지 사항

- `any` 타입 사용 금지 — 구체적인 타입 또는 `unknown` 사용
- 인라인 스타일 사용 금지 — SCSS 사용
- `pages/` 디렉토리 사용 금지 — App Router(`src/app/`)만 사용
- `var` 사용 금지 — `const`/`let` 사용
- `.env` 파일 커밋 금지
- `console.log` 프로덕션 코드에 남기지 않기
- npm/yarn 사용 금지 — pnpm만 사용
- 페이지/레이아웃 컴포넌트에 default export 누락 금지

## 커밋 / PR 규칙

Conventional Commits 형식 사용:

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷팅, 세미콜론 누락 등 (로직 변경 없음)
refactor: 리팩토링
test: 테스트 추가/수정
chore: 빌드 설정, 패키지 업데이트 등
```

- 커밋 메시지 한국어 허용 (예: `feat: 메인 히어로 섹션 구현`)
- PR 제목은 `type: 설명` 형식
- PR 본문에 변경 사항 요약 필수
