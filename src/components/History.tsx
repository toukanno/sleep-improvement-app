import React, { useState } from 'react';
import { SleepRecord } from '../types/sleep';
import { calcDuration, formatDuration, qualityColor, qualityLabel } from '../utils/sleepUtils';
import styles from './History.module.css';

interface Props {
  records: SleepRecord[];
  onDelete: (id: string) => void;
}

export const History: React.FC<Props> = ({ records, onDelete }) => {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirmId === id) {
      onDelete(id);
      setConfirmId(null);
    } else {
      setConfirmId(id);
      setTimeout(() => setConfirmId(null), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>睡眠履歴</h1>
        <p className={styles.subtitle}>全 {records.length} 件</p>
      </header>

      {records.length === 0 ? (
        <div className={styles.empty}>
          <p>まだ記録がありません</p>
          <p className={styles.emptyHint}>「記録する」タブから睡眠を記録しましょう！</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {records.map((r) => {
            const dur = calcDuration(r.bedTime, r.wakeTime);
            return (
              <li key={r.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.date}>{r.date}</span>
                  <span
                    className={styles.quality}
                    style={{ color: qualityColor(r.quality) }}
                  >
                    {qualityLabel(r.quality)}
                  </span>
                </div>
                <div className={styles.cardMid}>
                  <span className={styles.times}>
                    🌙 {r.bedTime} → ☀️ {r.wakeTime}
                  </span>
                  <span className={styles.duration}>{formatDuration(dur)}</span>
                </div>
                {r.tags.length > 0 && (
                  <div className={styles.tags}>
                    {r.tags.map((t) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                )}
                {r.notes && <p className={styles.notes}>{r.notes}</p>}
                <button
                  className={`${styles.deleteBtn} ${confirmId === r.id ? styles.confirm : ''}`}
                  onClick={() => handleDelete(r.id)}
                >
                  {confirmId === r.id ? 'もう一度押すと削除' : '削除'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
