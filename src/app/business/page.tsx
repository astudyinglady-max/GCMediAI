import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero/PageHero';
import BusinessClient from './BusinessClient';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '사업분야 — GC MediAI',
  description:
    '의사랑, 유팜, UBIST, 똑닥 등 GC MediAI의 핵심 사업 영역을 소개합니다.',
};

export default function BusinessPage() {
  return (
    <main className={styles.main}>
      <PageHero
        eyebrow="Business Areas"
        title="Business"
        description="의료 생태계 전반을 연결하는 GC MediAI의 핵심 플랫폼"
      />

      {/* 서브탭 + 콘텐츠 (클라이언트 컴포넌트) */}
      <BusinessClient />
    </main>
  );
}
