# GCMediAI 회사소개 홈페이지

> **Beyond EMR, Toward Medical OS**
> GC메디아이 공식 회사소개 홈페이지 리뉴얼 프로젝트

---

## 프로젝트 개요

GC메디아이는 국내 최대 의료 IT 네트워크를 기반으로 AI 중심의 의료 플랫폼 기업으로 도약하는 비전을 가지고 있습니다. 이 프로젝트는 그 비전을 담은 공식 회사소개 홈페이지 리뉴얼입니다.

### 핵심 수치

| 지표 | 수치 |
|------|------|
| 의료기관 네트워크 | 25,000처+ |
| 누적 의료 데이터 | 2억 건+ |
| AI 전담 조직 | 운영 중 |
| AI 인프라 | H100 기반 Medical LLM |

---

## 주요 페이지 및 기능

| 페이지 | 주요 콘텐츠 |
|--------|------------|
| **메인** | 히어로 섹션(Beyond EMR), AI Capability 수치, 사업분야 요약, 뉴스, IR |
| **회사소개** | GC메디아이 소개(3단 내러티브), 연혁, 가족사/관계사, 오시는 길 |
| **사업분야** | 메디컬 인프라(의사랑/유팜), 데이터·마케팅(UBIST), 플랫폼(똑닥), 유통·의료기기(미소몰) |
| **IR** | 주가정보, 재무정보, 공시자료, 주주공고, NEWS(보도자료) |
| **문의하기** | 문의 폼 |

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | SCSS |
| 상태관리 | TanStack Query (서버 상태) |
| 배포 | Vercel |
| Lint/Format | ESLint, Prettier |

---

## 프로젝트 구조

```
GCMediAI/
├── src/
│   ├── app/          # App Router 페이지 (라우팅)
│   ├── components/   # 공용 컴포넌트
│   ├── lib/          # 유틸리티 함수
│   ├── styles/       # 글로벌 스타일
│   └── types/        # TypeScript 타입 정의
├── public/           # 정적 파일 (이미지, 폰트 등)
├── docs/             # 기획 문서
└── README.md
```

---

## 로컬 실행 방법

### 사전 요구사항

- Node.js 20+
- pnpm

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 로컬 실행
pnpm start
```

---

## 환경변수

루트에 `.env.local` 파일을 생성하고 아래 변수를 설정합니다.

```env
# API
NEXT_PUBLIC_API_URL=https://api.example.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 사이트 도메인
NEXT_PUBLIC_SITE_URL=https://www.gcmediai.com

# IR API (필요 시)
IR_API_KEY=your_ir_api_key
```

---

## 사업분야 소개

- **메디컬 인프라**: 의사랑(EMR), 유팜(약국 솔루션) — 전국 의료기관 대상 핵심 인프라
- **데이터·마케팅**: UBIST — 의료 데이터 분석 및 마케팅 솔루션
- **플랫폼**: 똑닥 — 병원 예약/접수 서비스
- **유통·의료기기**: 미소몰 — 의료 소모품 및 기기 유통 플랫폼

---

## 관련 문서

기획 문서는 `docs/` 디렉토리를 참고하세요.
