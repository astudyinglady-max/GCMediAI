import type { BusinessArea } from '@/types';

export const BUSINESS_AREAS: BusinessArea[] = [
  {
    id: 'uisarang',
    name: '메디컬 인프라',
    description:
      '국내 EMR 1위, ‘의사랑’과 ‘유팜’을 중심으로 병·의원과 약국 운영 전반을 연결하는 핵심 인프라 ',
    services: [
      {
        name: 'Cloud EMR',
        description: 'SaaS 기반 클라우드 전자의무기록 시스템',
        features: [
          '실시간 데이터 동기화',
          'FHIR 표준 지원',
          '자동 백업 및 재해복구',
          '멀티 디바이스 접근',
        ],
        url: '/business#uisarang',
      },
      {
        name: 'AI Auxiliary Diagnosis',
        description: '영상 및 텍스트 기반 AI 임상 의사결정 지원',
        features: [
          '흉부 X-ray AI 분석',
          '처방 이상반응 감지',
          '임상 문서 자동완성',
          '근거 기반 치료 가이드',
        ],
        url: '/business#uisarang-ai',
      },
    ],
  },
  {
    id: 'dataMarketing',
    name: '데이터 · 마케팅',
    description:
      '원외·원내 처방 데이터를 기반으로 제약·바이오 비즈니스 인사이트를 제공하는 데이터 솔루션 ',
    services: [
      {
        name: 'Upharm Cloud',
        description: '클라우드 약국 관리 올인원 솔루션',
        features: [
          '처방전 자동 수신',
          '의약품 재고 최적화',
          '보험청구 자동화',
          '매출 분석 대시보드',
        ],
        url: '/business#ufarm',
      },
      {
        name: 'Upharm B2B Distribution',
        description: '병·의원·약국 대상 의약품 전자 구매 플랫폼',
        features: [
          '실시간 재고 조회',
          '자동 발주',
          '콜드체인 추적',
          '전자세금계산서 연동',
        ],
        url: '/business#ufarm-b2b',
      },
    ],
  },
  {
    id: 'platform',
    name: '플랫폼',
    description:
      'EMR과 연결된 진료·만성질환 관리 플랫폼으로 진료 예약부터 맞춤형 건강관리까지 환자 중심의 서비스',
    services: [
      {
        name: 'UBIST Report',
        description: '처방 데이터 기반 제약 시장 분석 서비스',
        features: [
          '성분·제품별 처방 트렌드',
          '경쟁사 시장점유율 분석',
          '지역별 처방 패턴',
          '맞춤형 리포트 생성',
        ],
        url: '/business#ubist',
      },
      {
        name: 'UBIST AI Analytics',
        description: 'AI 기반 의약품 수요 예측 및 마케팅 최적화',
        features: [
          '수요 예측 모델',
          '최적 영업 타깃 추천',
          '처방 변화 알림',
          'API 연동 지원',
        ],
        url: '/business#ubist-ai',
      },
    ],
  },
  {
    id: 'distribution',
    name: '유통 · 의료기기',
    description:
      '의약품과 의료기기 유통부터 맞춤형 컨설팅까지 의료 현장을 온·오프라인으로 연결하는 유통 네트워크',
    services: [
      {
        name: '똑닥',
        description: '모바일 병원 예약·비대면 진료 슈퍼앱',
        features: [
          '실시간 접수 및 예약',
          '비대면 진료',
          '처방전 전송',
          'AI 증상 체크',
        ],
        url: '/business#ddocdoc',
      },
      {
        name: '미소몰',
        description: '의료기관·환자 대상 의료 소모품 이커머스',
        features: [
          '의료 소모품 정기 구독',
          '병원 대량구매 할인',
          '당일 배송',
          '품질 인증 제품',
        ],
        url: '/business#misomall',
      },
    ],
  },
];
