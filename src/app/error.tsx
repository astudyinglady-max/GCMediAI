'use client';

import { useEffect } from 'react';
import styles from './error.module.scss';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // 프로덕션 에러 로깅 서비스 연동 지점
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <p className={styles.code}>500</p>
        <h1 className={styles.heading}>서버 오류가 발생했습니다</h1>
        <p className={styles.desc}>
          일시적인 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도하거나 아래 버튼을 눌러주세요.
        </p>
        <div className={styles.actions}>
          <button onClick={reset} className={styles.retryBtn}>
            다시 시도
          </button>
          <a href='/' className={styles.homeLink}>
            홈으로 이동
          </a>
        </div>
      </div>
    </main>
  );
}
