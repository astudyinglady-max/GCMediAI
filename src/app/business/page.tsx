import type { Metadata } from 'next';
import { BUSINESS_AREAS } from '@/lib/data/business';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '사업분야 — GC MediAI',
  description: '의사랑, 유팜, UBIST, 똑닥 등 GC MediAI의 핵심 사업 영역을 소개합니다.',
};

export default function BusinessPage() {
  return (
    <main className={styles.main}>
      {/* 히어로 */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Business Areas</p>
        <h1 className={styles.heading}>사업분야</h1>
        <p className={styles.sub}>
          의료 생태계 전반을 연결하는 GC MediAI의 핵심 플랫폼
        </p>
      </section>

      {/* 사업 영역 목록 */}
      {BUSINESS_AREAS.map((area, areaIdx) => (
        <section
          key={area.id}
          id={area.id}
          className={[styles.areaSection, areaIdx % 2 === 1 ? styles.areaSectionAlt : '']
            .filter(Boolean)
            .join(' ')}
        >
          <div className={styles.container}>
            <div className={styles.areaHeader}>
              <h2 className={styles.areaName}>{area.name}</h2>
              <p className={styles.areaDesc}>{area.description}</p>
            </div>

            <div className={styles.serviceGrid}>
              {area.services.map((service) => (
                <div key={service.name} className={styles.serviceCard}>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <p className={styles.serviceDesc}>{service.description}</p>
                  <ul className={styles.featureList}>
                    {service.features.map((feat) => (
                      <li key={feat} className={styles.featureItem}>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
