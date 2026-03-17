import type { Metadata } from 'next';
import Link from 'next/link';
import { NEWS_ITEMS } from '@/lib/data/news';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'IR 뉴스 — GC MediAI',
  description: 'GC MediAI의 최신 소식과 보도자료를 확인하세요.',
};

export default function IrNewsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>IR News</p>
        <h1 className={styles.heading}>뉴스</h1>
        <p className={styles.sub}>GC MediAI의 최신 소식을 전해드립니다.</p>
      </section>

      <div className={styles.container}>
        <div className={styles.newsGrid}>
          {NEWS_ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={`/ir/news/${item.slug}`}
              className={styles.newsCard}
            >
              <span className={styles.newsCategory}>{item.category}</span>
              <h2 className={styles.newsTitle}>{item.title}</h2>
              <p className={styles.newsPreview}>{item.preview}</p>
              <span className={styles.newsDate}>{item.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
