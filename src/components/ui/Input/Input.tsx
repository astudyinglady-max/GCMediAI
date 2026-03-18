'use client';

import { useRef, useState, type InputHTMLAttributes, type ChangeEvent } from 'react';
import styles from './Input.module.scss';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: 'text' | 'email' | 'tel' | 'password' | 'search' | 'url' | 'number';
  /** X 버튼 클릭 시 추가 콜백 (controlled 모드에서 state 초기화 등) */
  onClear?: () => void;
};

export default function Input({
  type = 'text',
  value,
  defaultValue,
  onChange,
  onClear,
  disabled,
  className,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;

  // uncontrolled 모드에서 값 유무 추적
  const [hasInternalValue, setHasInternalValue] = useState(
    Boolean(defaultValue && String(defaultValue).length > 0),
  );

  const hasValue = isControlled
    ? String(value ?? '').length > 0
    : hasInternalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setHasInternalValue(e.target.value.length > 0);
    onChange?.(e);
  };

  const handleClear = () => {
    onClear?.();

    const input = inputRef.current;
    if (!input) return;

    // controlled / uncontrolled 모두 대응:
    // React의 synthetic event 시스템을 우회하지 않고 nativeSetter로 값을 바꾼 뒤
    // 'input' 이벤트를 dispatch → React가 onChange를 다시 호출
    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    )?.set;
    nativeSetter?.call(input, '');
    input.dispatchEvent(new Event('input', { bubbles: true }));

    if (!isControlled) setHasInternalValue(false);
    input.focus();
  };

  return (
    <div
      className={[
        styles.wrapper,
        disabled ? styles.disabled : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        ref={inputRef}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        disabled={disabled}
        className={[styles.input, hasValue ? styles.inputWithClear : '']
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />

      {/* value가 있고 비활성이 아닐 때만 초기화 버튼 노출 */}
      {hasValue && !disabled && (
        <button
          type='button'
          className={styles.clearBtn}
          onClick={handleClear}
          aria-label='입력 초기화'
          tabIndex={-1}
        >
          <svg
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              d='M1 1l8 8M9 1L1 9'
              stroke='currentColor'
              strokeWidth='1.7'
              strokeLinecap='round'
            />
          </svg>
        </button>
      )}
    </div>
  );
}
