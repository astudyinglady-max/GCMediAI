import type { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/data/company';
import PageHero from '@/components/layout/PageHero/PageHero';
import AboutClient from './AboutClient';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '회사소개 — GC MediAI',
  description:
    'GC MediAI는 27년간 대한민국 의료 현장을 함께해온 의료 IT 전문 기업입니다.',
};

const ABOUT_BG =
  'https://images.unsplash.com/photo-1769670385952-36414b192051?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <PageHero
        eyebrow="About GC MediAI"
        title="Company"
      />

      {/* 서브탭 + 서브비주얼 + 콘텐츠 (클라이언트 컴포넌트) */}
      <AboutClient subVisualSrc={ABOUT_BG} />
    </main>
  );
}
