import type { ReactNode } from 'react';
import styles from './PageHero.module.scss';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  backgroundImage?: string;
};

export default function PageHero({ eyebrow, title, description, backgroundImage }: PageHeroProps) {
  const bgStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat' as const,
        backgroundPosition: 'center' as const,
        backgroundSize: '180%' as const,
      }
    : undefined;

  return (
    <section className={styles.hero} style={bgStyle}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.heading}>{title}</h1>
      {description && <p className={styles.sub}>{description}</p>}
    </section>
  );
}
