# IR 데이터 연동

> **프로젝트**: GCMediAI 회사소개 홈페이지 리뉴얼
> **작성일**: 2026-03-16
> **연관 문서**: [요구사항 정의서](./요구사항.md), [기술스택](./기술스택.md)

---

## 개요

GC메디아이는 유비케어(KOSDAQ: 032620)에서 사명을 변경한 상장사다. DART OpenAPI와 KRX 데이터 API를 통해 공시 정보, 재무정보, 주가 데이터를 공식 경로로 연동할 수 있다.

| 데이터 | 출처 | 비용 | 안정성 | MVP 포함 |
|--------|------|------|--------|:-------:|
| 공시 목록 | DART OpenAPI | 무료 | ✅ 공식 | Should Have |
| 재무정보 | DART OpenAPI | 무료 | ✅ 공식 | Should Have |
| 실시간 주가 | KRX 데이터 API | 무료 (키 필요) | ✅ 공식 | Nice to Have |
| 실시간 주가 (임시) | 네이버 금융 비공식 | 무료 | ⚠️ 비공식 | 검증용 한정 |

---

## 1. 사전 준비

### 1-1. 종목 정보

| 항목 | 값 |
|------|----|
| 구 사명 | 유비케어 |
| 현 사명 | GC메디아이 |
| 거래소 | KOSDAQ |
| 종목코드 | **032620** |
| DART corp_code | 아래 API로 조회 (최초 1회) |

### 1-2. API 키 발급

**DART OpenAPI**
1. https://opendart.fss.or.kr 접속
2. 회원가입 → 인증키 신청 → 즉시 발급
3. 일 요청 한도: **10,000건** (회사소개 사이트는 충분)

**KRX 데이터 API** (실시간 주가, Nice to Have)
1. https://data.krx.co.kr 접속
2. 회원가입 → API 사용 신청 → 키 발급 (심사 후 발급)

### 1-3. 환경변수 설정

`.env.local`에 추가:

```env
# DART OpenAPI
DART_API_KEY=your_dart_api_key

# DART 고유번호 (아래 1-4 조회 후 기입)
DART_CORP_CODE=

# KRX 데이터 API (Nice to Have)
KRX_API_KEY=your_krx_api_key
```

### 1-4. DART corp_code 조회 (최초 1회)

DART에서 종목코드로 corp_code를 조회해 `.env.local`의 `DART_CORP_CODE`에 기입한다.

```bash
curl "https://opendart.fss.or.kr/api/company.json\
?crtfc_key={DART_API_KEY}\
&stock_code=032620"
```

응답 예시:
```json
{
  "status": "000",
  "corp_code": "00000000",  ← 이 값을 DART_CORP_CODE에 기입
  "corp_name": "지씨메디아이",
  "stock_code": "032620",
  "modify_date": "20260101"
}
```

---

## 2. 공시 목록 연동 (DART OpenAPI)

### API 엔드포인트

```
GET https://opendart.fss.or.kr/api/list.json
```

| 파라미터 | 값 | 설명 |
|----------|----|------|
| `crtfc_key` | `{DART_API_KEY}` | 인증키 |
| `corp_code` | `{DART_CORP_CODE}` | 고유번호 |
| `bgn_de` | `20240101` | 조회 시작일 |
| `end_de` | `20261231` | 조회 종료일 |
| `page_no` | `1` | 페이지 번호 |
| `page_count` | `10` | 페이지당 건수 (최대 100) |

### Next.js Route Handler

```ts
// src/app/api/ir/disclosures/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ?? '1';

  const res = await fetch(
    `https://opendart.fss.or.kr/api/list.json` +
    `?crtfc_key=${process.env.DART_API_KEY}` +
    `&corp_code=${process.env.DART_CORP_CODE}` +
    `&bgn_de=20240101` +
    `&end_de=20261231` +
    `&page_no=${page}` +
    `&page_count=10`,
    { next: { revalidate: 3600 } } // 1시간 캐싱
  );

  const data = await res.json();

  if (data.status !== '000') {
    return Response.json({ error: data.message }, { status: 500 });
  }

  return Response.json({
    list: data.list,
    totalCount: data.total_count,
    page: data.page_no,
  });
}
```

### 응답 데이터 타입

```ts
// src/types/ir.ts
export type Disclosure = {
  rcept_no: string;      // 접수번호
  corp_cls: string;      // 법인구분 (Y: 유가, K: 코스닥)
  corp_code: string;     // 고유번호
  corp_name: string;     // 회사명
  report_nm: string;     // 보고서명
  rcept_dt: string;      // 접수일자 (YYYYMMDD)
  flr_nm: string;        // 공시 제출인명
  rm: string;            // 비고
};
```

### DART 원문 링크 생성

공시 원문은 별도 API 없이 `rcept_no`로 URL을 조합한다.

```ts
const dartUrl = `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${disclosure.rcept_no}`;
```

---

## 3. 재무정보 연동 (DART OpenAPI)

### API 엔드포인트

단일 회사의 재무제표를 연도별로 조회한다.

```
GET https://opendart.fss.or.kr/api/fnlttSinglAcnt.json
```

| 파라미터 | 값 | 설명 |
|----------|----|------|
| `crtfc_key` | `{DART_API_KEY}` | 인증키 |
| `corp_code` | `{DART_CORP_CODE}` | 고유번호 |
| `bsns_year` | `2025` | 사업연도 |
| `reprt_code` | `11011` | 보고서 코드 |

보고서 코드:
- `11011` — 사업보고서 (연간, 가장 완전한 재무정보)
- `11012` — 반기보고서
- `11013` — 1분기보고서
- `11014` — 3분기보고서

### Next.js Route Handler

```ts
// src/app/api/ir/financials/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year') ?? '2025';

  const res = await fetch(
    `https://opendart.fss.or.kr/api/fnlttSinglAcnt.json` +
    `?crtfc_key=${process.env.DART_API_KEY}` +
    `&corp_code=${process.env.DART_CORP_CODE}` +
    `&bsns_year=${year}` +
    `&reprt_code=11011`,
    { next: { revalidate: 86400 } } // 24시간 캐싱 (연간 보고서는 자주 바뀌지 않음)
  );

  const data = await res.json();
  return Response.json(data.list ?? []);
}
```

---

## 4. 실시간 주가 연동

### 옵션 A: 네이버 금융 비공식 API (MVP 검증용)

⚠️ **비공식 API다. 이용약관 위반 소지가 있으므로 기능 검증 목적으로만 사용하고, 이후 KRX 정식 API로 교체한다.**

```ts
// src/app/api/ir/stock/route.ts
export async function GET() {
  const res = await fetch(
    'https://polling.finance.naver.com/api/realtime/domestic/stock/032620',
    { next: { revalidate: 60 } } // 1분 캐싱
  );

  const data = await res.json();

  return Response.json({
    price: data.dealTrdPrc,         // 현재가
    change: data.cmpprevddPrc,      // 전일 대비
    changeRate: data.flctRt,        // 등락률
    volume: data.acmlTrdvol,        // 거래량
    updatedAt: new Date().toISOString(),
  });
}
```

### 옵션 B: KRX 데이터 API (정식, Nice to Have)

KRX API 키 발급 후 적용. KOSDAQ 일별 거래 정보 조회:

```
POST https://data-dbg.krx.co.kr/svc/apis/sto/ksq_bydd_trd
Content-Type: application/json

{
  "AUTH_KEY": "{KRX_API_KEY}",
  "ISU_CD": "032620",
  "BAS_DD": "20260316"
}
```

### 주가 데이터 타입

```ts
// src/types/ir.ts
export type StockPrice = {
  price: string;       // 현재가
  change: string;      // 전일 대비 등락
  changeRate: string;  // 등락률 (%)
  volume: string;      // 거래량
  updatedAt: string;   // 조회 시각 (ISO 8601)
};
```

---

## 5. 캐싱 전략 요약

| 데이터 | 갱신 주기 | revalidate |
|--------|----------|------------|
| 주가 | 실시간 (장중) | `60`초 |
| 공시 목록 | 수시 (일 수회) | `3600`초 (1시간) |
| 재무정보 | 분기 1회 | `86400`초 (24시간) |

모든 fetch는 Next.js의 `next: { revalidate }` 옵션으로 캐싱한다. 클라이언트가 직접 외부 API를 호출하지 않도록 **반드시 Route Handler를 프록시로 사용**한다 (API 키 노출 방지).

---

## 6. 구현 순서 (권장)

```
1단계 (Should Have)
  ① DART API 키 발급 → corp_code 조회 → .env.local 설정
  ② 공시 목록 Route Handler 구현
  ③ IR 페이지에서 공시 목록 표시 (날짜, 제목, DART 원문 링크)

2단계 (Should Have)
  ④ 재무정보 Route Handler 구현
  ⑤ IR 페이지에 연도별 재무 요약 표시

3단계 (Nice to Have)
  ⑥ 네이버 금융 비공식 API로 주가 위젯 검증
  ⑦ KRX 데이터 API 키 발급 후 정식 교체
```

---

## 참고 링크

- DART OpenAPI 문서: https://opendart.fss.or.kr/guide/detail.do
- KRX 데이터 서비스: https://data.krx.co.kr
- DART 공시 원문 베이스 URL: `https://dart.fss.or.kr/dsaf001/main.do?rcpNo={rcept_no}`
