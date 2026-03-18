import type { Metadata } from 'next';
import { FINANCIAL_DATA, DISCLOSURES, SHAREHOLDER_NOTICE, SHAREHOLDER_NOTICES } from '@/lib/data/ir';
import { NEWS_ITEMS } from '@/lib/data/news';
import PageHero from '@/components/layout/PageHero/PageHero';
import IrPageClient from './IrPageClient';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'IR — GC MediAI',
  description: 'GC MediAI 투자자 관계 정보. 재무정보, 공시자료, 주주공고, 뉴스를 확인하세요.',
};

export default function IrPage() {
  return (
    <main className={styles.main}>
      <PageHero
        eyebrow="Investor Relations"
        title="IR"
        description="GC MediAI의 재무정보, 공시자료, 주주공고를 확인하세요."
      />

      {/* 탭 + 콘텐츠 */}
      <IrPageClient
        financialData={FINANCIAL_DATA}
        disclosures={DISCLOSURES}
        shareholderNotice={SHAREHOLDER_NOTICE}
        shareholderNotices={SHAREHOLDER_NOTICES}
        news={NEWS_ITEMS}
      />
    </main>
  );
}
