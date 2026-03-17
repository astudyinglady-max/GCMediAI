import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

type Variant = 'solid' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export default function Button({
  variant = 'solid',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
