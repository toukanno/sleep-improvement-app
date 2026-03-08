import React from 'react';
import { Page } from '../types/sleep';
import styles from './Navbar.module.css';

interface Props {
  current: Page;
  onChange: (page: Page) => void;
}

const NAV_ITEMS: { page: Page; label: string; icon: string }[] = [
  { page: 'dashboard', label: 'ダッシュボード', icon: '🏠' },
  { page: 'record', label: '記録する', icon: '✏️' },
  { page: 'history', label: '履歴', icon: '📊' },
  { page: 'tips', label: 'アドバイス', icon: '💡' },
];

export const Navbar: React.FC<Props> = ({ current, onChange }) => {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(({ page, label, icon }) => (
        <button
          key={page}
          className={`${styles.navBtn} ${current === page ? styles.active : ''}`}
          onClick={() => onChange(page)}
        >
          <span className={styles.icon}>{icon}</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </nav>
  );
};
