import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './not-found.module.scss';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다 — GC MediAI',
};

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.heading}>페이지를 찾을 수 없습니다</h1>
        <p className={styles.desc}>
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
          <br />
          주소를 다시 확인하거나 홈으로 돌아가세요.
        </p>
        <Link href='/' className={styles.homeBtn}>
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
