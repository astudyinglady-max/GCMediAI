import type { Metadata } from 'next';
import Link from 'next/link';
import { FINANCIAL_DATA, DISCLOSURES, SHAREHOLDER_NOTICE } from '@/lib/data/ir';
import { NEWS_ITEMS } from '@/lib/data/news';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'IR — GC MediAI',
  description: 'GC MediAI 투자자 관계 정보. 재무정보, 공시자료, 주주공고, 뉴스를 확인하세요.',
};

export default function IrPage() {
  const recentNews = NEWS_ITEMS.slice(0, 3);

  return (
    <main className={styles.main}>
      {/* 히어로 */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Investor Relations</p>
        <h1 className={styles.heading}>IR</h1>
        <p className={styles.sub}>
          GC MediAI의 재무정보, 공시자료, 주주공고를 확인하세요.
        </p>
      </section>

      <div className={styles.container}>
        {/* 재무정보 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>재무정보</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>연도</th>
                  <th>매출액 (억원)</th>
                  <th>영업이익 (억원)</th>
                  <th>영업이익률</th>
                </tr>
              </thead>
              <tbody>
                {FINANCIAL_DATA.slice()
                  .reverse()
                  .map((row) => (
                    <tr key={row.year}>
                      <td>{row.year}</td>
                      <td>{row.revenue.toLocaleString()}</td>
                      <td>{row.operatingProfit.toLocaleString()}</td>
                      <td>
                        {((row.operatingProfit / row.revenue) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 공시자료 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>공시자료</h2>
          <ul className={styles.disclosureList}>
            {DISCLOSURES.map((d) => (
              <li key={d.id} className={styles.disclosureItem}>
                <a
                  href={d.dartUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.disclosureLink}
                >
                  <span className={styles.disclosureTitle}>{d.title}</span>
                  <span className={styles.disclosureDate}>{d.date}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.dartNote}>
            전체 공시는{' '}
            <a
              href='https://dart.fss.or.kr'
              target='_blank'
              rel='noopener noreferrer'
            >
              DART
            </a>
            에서 확인하세요.
          </p>
        </section>

        {/* 주주공고 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>주주공고</h2>
          <div className={styles.noticeBox}>
            <pre className={styles.noticePre}>{SHAREHOLDER_NOTICE}</pre>
          </div>
        </section>

        {/* 뉴스 미리보기 */}
        <section className={styles.section}>
          <div className={styles.newsTitleRow}>
            <h2 className={styles.sectionTitle}>최신 뉴스</h2>
            <Link href='/ir/news' className={styles.viewAll}>
              전체 보기 →
            </Link>
          </div>
          <div className={styles.newsGrid}>
            {recentNews.map((item) => (
              <Link
                key={item.slug}
                href={`/ir/news/${item.slug}`}
                className={styles.newsCard}
              >
                <span className={styles.newsCategory}>{item.category}</span>
                <h3 className={styles.newsTitle}>{item.title}</h3>
                <p className={styles.newsPreview}>{item.preview}</p>
                <span className={styles.newsDate}>{item.date}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
