'use client';

import { useActionState } from 'react';
import { submitContact } from './actions';
import styles from './page.module.scss';

export default function ContactForm() {
  const [state, action, isPending] = useActionState(submitContact, null);

  if (state?.success) {
    return (
      <div className={styles.successBox}>
        <p className={styles.successIcon}>✓</p>
        <p className={styles.successMsg}>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className={styles.form}>
      {state && !state.success && (
        <p className={styles.errorMsg}>{state.message}</p>
      )}

      <div className={styles.row}>
        <label className={styles.label}>
          이름 <span className={styles.required}>*</span>
          <input
            type='text'
            name='name'
            required
            placeholder='홍길동'
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          이메일 <span className={styles.required}>*</span>
          <input
            type='email'
            name='email'
            required
            placeholder='hello@example.com'
            className={styles.input}
          />
        </label>
      </div>

      <label className={styles.label}>
        소속 기관 / 회사
        <input
          type='text'
          name='organization'
          placeholder='병원명 또는 회사명 (선택)'
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        문의 내용 <span className={styles.required}>*</span>
        <textarea
          name='message'
          required
          placeholder='도입 관련 문의, 파트너십 제안 등 자유롭게 작성해주세요.'
          rows={6}
          className={styles.textarea}
        />
      </label>

      <button type='submit' disabled={isPending} className={styles.submitBtn}>
        {isPending ? '전송 중…' : '문의 보내기'}
      </button>
    </form>
  );
}
