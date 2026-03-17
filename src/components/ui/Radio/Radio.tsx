'use client';

import type { InputHTMLAttributes } from 'react';
import styles from './Radio.module.scss';

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
};

export default function Radio({ label, id, className, ...rest }: RadioProps) {
  return (
    <label className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}>
      <span className={styles.control}>
        <input type='radio' id={id} className={styles.input} {...rest} />
        <span className={styles.circle} aria-hidden='true'>
          <span className={styles.dot} />
        </span>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
