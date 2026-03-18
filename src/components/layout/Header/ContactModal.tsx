'use client';

import { useActionState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { submitContact } from '@/app/contact/actions';
import styles from './ContactModal.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
};

function ModalForm({ onClose }: { onClose: () => void }) {
  const [state, action, isPending] = useActionState(submitContact, null);

  if (state?.success) {
    return (
      <div className={styles.success}>
        <div className={styles.successMark}>✓</div>
        <p className={styles.successTitle}>문의가 접수되었습니다</p>
        <p className={styles.successSub}>{state.message}</p>
        <button
          type="button"
          className={styles.closeAfterSuccess}
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    );
  }

  return (
    <form action={action} className={styles.form}>
      {state && !state.success && (
        <p className={styles.errorMsg}>{state.message}</p>
      )}

      {/* 문의유형 */}
      <div className={styles.typeGroup}>
        <span className={styles.label}>
          문의유형 <span className={styles.req}>*</span>
        </span>
        <div className={styles.typeBtnRow}>
          {(['대표문의', 'IR', 'PR', '협업문의'] as const).map((type) => (
            <label key={type} className={styles.typeBtn}>
              <input type='radio' name='inquiryType' value={type} required />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>
          이름 <span className={styles.req}>*</span>
          <input
            type="text"
            name="name"
            required
            placeholder="홍길동"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          이메일 <span className={styles.req}>*</span>
          <input
            type="email"
            name="email"
            required
            placeholder="hello@example.com"
            className={styles.input}
          />
        </label>
      </div>

      <label className={styles.label}>
        소속 기관 / 회사
        <input
          type="text"
          name="organization"
          placeholder="병원명 또는 회사명 (선택)"
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        문의 내용 <span className={styles.req}>*</span>
        <textarea
          name="message"
          required
          placeholder="도입 관련 문의, 파트너십 제안 등 자유롭게 작성해주세요."
          rows={5}
          className={styles.textarea}
        />
      </label>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onClose}
          disabled={isPending}
        >
          취소
        </button>
        <button type="submit" disabled={isPending} className={styles.submitBtn}>
          {isPending ? '전송 중…' : '문의 보내기'}
        </button>
      </div>
    </form>
  );
}

export default function ContactModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // ESC 키 닫기 + 배경 스크롤 잠금
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="문의 문의"
      onClick={(e) => {
        // 배경 클릭 시 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modal} ref={dialogRef}>
        {/* 헤더 */}
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalEyebrow}>Contact</p>
            <h2 className={styles.modalTitle}>문의하기</h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="닫기"
            onClick={onClose}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* 폼 */}
        <div className={styles.modalBody}>
          <ModalForm onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
