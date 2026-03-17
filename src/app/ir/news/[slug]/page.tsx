import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsBySlug, getAllNewsSlugs } from '@/lib/data/news';
import styles from './page.module.scss';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: '뉴스를 찾을 수 없습니다 — GC MediAI' };
  return {
    title: `${item.title} — GC MediAI`,
    description: item.preview,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) notFound();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href='/ir/news' className={styles.back}>
          ← 뉴스 목록
        </Link>

        <article className={styles.article}>
          <header className={styles.header}>
            <span className={styles.category}>{item.category}</span>
            <h1 className={styles.title}>{item.title}</h1>
            <time className={styles.date} dateTime={item.date}>
              {item.date}
            </time>
          </header>

          <div className={styles.body}>
            {item.body.split('\n\n').map((para, i) => (
              <p key={i} className={styles.para}>
                {para}
              </p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
