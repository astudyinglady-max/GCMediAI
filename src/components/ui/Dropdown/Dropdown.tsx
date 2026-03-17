'use client';

import { useState, useRef, useEffect, useId } from 'react';
import styles from './Dropdown.module.scss';

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: Option[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
};

export default function Dropdown({
  options,
  value,
  placeholder = '선택하세요',
  disabled = false,
  onChange,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const listId = useId();

  const selected = options.find((o) => o.value === value);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // 키보드 탐색
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'ArrowDown' && open) {
      e.preventDefault();
      const currentIdx = options.findIndex((o) => o.value === value);
      const next = options[currentIdx + 1];
      if (next) onChange?.(next.value);
    }
    if (e.key === 'ArrowUp' && open) {
      e.preventDefault();
      const currentIdx = options.findIndex((o) => o.value === value);
      const prev = options[currentIdx - 1];
      if (prev) onChange?.(prev.value);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={[styles.wrapper, disabled ? styles.disabled : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
    >
      {/* 트리거 버튼 */}
      <button
        type='button'
        id={triggerId}
        role='combobox'
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup='listbox'
        disabled={disabled}
        className={[styles.trigger, open ? styles.triggerOpen : '']
          .filter(Boolean)
          .join(' ')}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <span className={selected ? styles.selectedLabel : styles.placeholder}>
          {selected ? selected.label : placeholder}
        </span>
        {/* 화살표 아이콘 */}
        <svg
          className={[styles.arrow, open ? styles.arrowOpen : '']
            .filter(Boolean)
            .join(' ')}
          width='14'
          height='14'
          viewBox='0 0 14 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path
            d='M3 5l4 4 4-4'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {/* 옵션 리스트 */}
      {open && (
        <ul
          id={listId}
          role='listbox'
          aria-labelledby={triggerId}
          className={styles.list}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role='option'
              aria-selected={opt.value === value}
              className={[
                styles.option,
                opt.value === value ? styles.optionSelected : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
              {opt.value === value && (
                <svg
                  className={styles.optionCheck}
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                >
                  <path
                    d='M2.5 7l3.5 3.5 5.5-7'
                    stroke='currentColor'
                    strokeWidth='1.6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
