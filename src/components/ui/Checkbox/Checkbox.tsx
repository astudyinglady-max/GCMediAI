'use client';

import type { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
};

export default function Checkbox({ label, id, className, ...rest }: CheckboxProps) {
  return (
    <label className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}>
      <span className={styles.control}>
        <input type='checkbox' id={id} className={styles.input} {...rest} />
        <span className={styles.box} aria-hidden='true'>
          {/* 체크 아이콘 (SVG) */}
          <svg
            className={styles.check}
            viewBox='0 0 12 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 5l3.5 3.5L11 1'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
