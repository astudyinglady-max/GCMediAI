'use client';

import styles from './SubTabNav.module.scss';

export type TabItem = {
  id: string;
  label: string;
};

type SubTabNavProps = {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
};

export default function SubTabNav({ tabs, activeTab, onTabChange }: SubTabNavProps) {
  return (
    <nav className={styles.tabNav}>
      <div className={styles.inner}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabBtn} ${tab.id === activeTab ? styles.tabActive : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
