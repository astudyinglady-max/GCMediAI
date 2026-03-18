'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BUSINESS_AREAS } from '@/lib/data/business';
import type { BusinessArea } from '@/types';
import SubTabNav from '@/components/layout/SubTabNav/SubTabNav';
import styles from './BusinessClient.module.scss';

const BUSINESS_TABS = BUSINESS_AREAS.map((area) => ({ id: area.id, label: area.tabLabel }));

export default function BusinessClient() {
  const [activeId, setActiveId] = useState(BUSINESS_AREAS[0].id);
  const activeArea = BUSINESS_AREAS.find((a) => a.id === activeId) ?? BUSINESS_AREAS[0];

  return (
    <div className={styles.wrapper}>
      {/* 탭 내비게이션 */}
      <SubTabNav
        tabs={BUSINESS_TABS}
        activeTab={activeId}
        onTabChange={setActiveId}
      />

      {/* 탭 콘텐츠 */}
      <div className={styles.tabContent}>
        <AreaContent area={activeArea} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 사업 영역 콘텐츠
// ─────────────────────────────────────────────
function AreaContent({ area }: { area: BusinessArea }) {
  return (
    <div className={styles.areaSection}>
      {/* 영역 헤더 */}
      <div className={styles.areaHeader}>
        <h2 className={styles.areaName}>{area.name}</h2>
        <p className={styles.areaDesc}>
          {area.description.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </p>
      </div>

      {/* 통계 3개 */}
      {area.stats && area.stats.length > 0 && (
        <div className={styles.statsRow}>
          {area.stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* 서비스 블록 목록 */}
      <div className={styles.serviceList}>
        {area.services.map((service) => (
          <div key={service.name} className={styles.serviceBlock}>
            <div className={styles.serviceBlockHeader}>
              {service.tag && (
                <span className={styles.serviceTag}>{service.tag}</span>
              )}
              {service.badge && (
                <span className={styles.serviceBadge}>{service.badge}</span>
              )}
            </div>
            <div className={styles.serviceBlockBody}>
              <div className={styles.serviceBlockLeft}>
                <h3 className={styles.serviceName}>{service.name}</h3>
                {service.slogan && (
                  <p className={styles.serviceSlogan}>{service.slogan}</p>
                )}
                <p className={styles.serviceDesc}>{service.description}</p>
                {service.url && service.url !== '#' ? (
                  <a
                    href={service.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.serviceLink}
                  >
                    바로가기 →
                  </a>
                ) : service.badge ? (
                  <span className={styles.serviceLinkDisabled}>출시 예정</span>
                ) : null}
              </div>
              <ul className={styles.featureList}>
                {service.features.map((feat) => (
                  <li key={feat} className={styles.featureItem}>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
