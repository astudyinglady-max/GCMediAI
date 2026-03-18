# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

GCMediAI 회사소개 홈페이지 리뉴얼 프로젝트.

**비전**: Beyond EMR, Toward Medical OS

**페이지 구성**:
- 메인 (/)
- 회사소개 (/about)
- 사업분야 (/business)
- IR (/ir) — 주가정보, 재무정보, 공시자료, 주주공고, NEWS
- 문의하기 (/contact)

## 개발 명령어

```bash
pnpm dev          # 개발 서버 (localhost:3000)
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 서버 실행
pnpm lint         # ESLint 검사
```

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **UI 라이브러리**: React 19
- **스타일링**: SCSS (sass)
- **애니메이션**: framer-motion
- **3D 배경**: @splinetool/react-spline (HeroSection)
- **패키지 매니저**: pnpm (npm/yarn 사용 금지)
- **배포**: Vercel

## 아키텍처

### 데이터 레이어
외부 API 없음 — 모든 콘텐츠 데이터는 `src/lib/data/` 하위 정적 TypeScript 파일로 관리:
- `business.ts` — 사업분야 데이터
- `company.ts` — 회사소개 데이터
- `ir.ts` — IR 데이터 (주가, 재무, 공시 등)
- `news.ts` — 뉴스 데이터

### 문의 폼 (Server Actions)
`src/app/contact/actions.ts`에 `'use server'` 선언. `useActionState`로 상태 관리. 현재는 실제 전송 없이 성공 응답만 반환 — 실제 배포 시 이메일/DB 연동 필요.

### 헤더 동작
- 홈(`/`)에서 스크롤 전: 투명 (`headerTransparent`)
- 스크롤 후 or 다른 페이지: 불투명 (`headerScrolled`)
- 데스크톱: 마우스오버 드롭다운, 모바일: 햄버거 드로어
- 문의하기 버튼 → `ContactModal` (Header 내 상태로 제어)

### 섹션 구성 (메인 페이지)
`HeroSection` → `AiCapabilitySection` → `CompanyIntroduce` → `BusinessSection` → `NewsSection` → `IrSection`

## 프론트엔드 UI 컴포넌트 규칙

@프론트엔드.md

## 코딩 컨벤션

### 네이밍 규칙
- **컴포넌트**: PascalCase — `HeroSection.tsx`, `BusinessCard.tsx`
- **유틸리티/훅**: camelCase — `useScrollAnimation.ts`, `formatDate.ts`
- **타입/인터페이스**: PascalCase, `I` 접두사 없음 — `BusinessArea`
- **상수**: UPPER_SNAKE_CASE — `SITE_NAME`, `API_BASE_URL`
- **디렉토리**: kebab-case — `business-area/`, `hero-section/`

### 컴포넌트 작성
- 파일 하나에 default export 컴포넌트 하나
- Server Component 우선, 클라이언트 인터랙션이 필요한 경우에만 `'use client'`
- 한국어 주석 사용

### 포맷팅 규칙
- 싱글따옴표(`'`) — 문자열, import 경로 모두
- 들여쓰기 2칸 (스페이스)
- 세미콜론 사용

### 스타일링 규칙
- SCSS — 컴포넌트별 `.module.scss` 파일 작성
- CSS 클래스명 camelCase — `heroSection`, `cardWrapper`
- 인라인 스타일 금지

## 금지 사항

- `any` 타입 사용 금지 — 구체적인 타입 또는 `unknown` 사용
- `pages/` 디렉토리 사용 금지 — App Router(`src/app/`)만 사용
- `var` 사용 금지 — `const`/`let` 사용
- `.env` 파일 커밋 금지
- `console.log` 프로덕션 코드에 남기지 않기

## 커밋 / PR 규칙

Conventional Commits 형식 + 한국어 허용:

```
feat: 메인 히어로 섹션 구현
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷팅 (로직 변경 없음)
refactor: 리팩토링
chore: 빌드 설정, 패키지 업데이트 등
```

- PR 제목은 `type: 설명` 형식
- PR 본문에 변경 사항 요약 필수
