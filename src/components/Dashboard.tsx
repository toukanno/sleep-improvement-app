import React from 'react';
import { SleepRecord, SleepStats } from '../types/sleep';
import { calcDuration, formatDuration, qualityColor, qualityLabel } from '../utils/sleepUtils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Dashboard.module.css';

interface Props {
  records: SleepRecord[];
  stats: SleepStats;
  onNavigateRecord: () => void;
}

export const Dashboard: React.FC<Props> = ({ records, stats, onNavigateRecord }) => {
  const latest = records[0];
  const chartData = records
    .slice(0, 7)
    .reverse()
    .map((r) => {
      const dur = calcDuration(r.bedTime, r.wakeTime);
      return {
        date: r.date.slice(5), // MM-DD
        duration: Math.round(dur / 6) / 10, // hours
        quality: r.quality,
      };
    });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.greeting}>おはようございます 🌙</p>
          <h1 className={styles.title}>睡眠ダッシュボード</h1>
        </div>
      </header>

      {latest ? (
        <div className={styles.latestCard}>
          <p className={styles.cardLabel}>昨夜の睡眠</p>
          <div className={styles.latestRow}>
            <div className={styles.latestItem}>
              <span className={styles.latestValue}>
                {formatDuration(calcDuration(latest.bedTime, latest.wakeTime))}
              </span>
              <span className={styles.latestUnit}>睡眠時間</span>
            </div>
            <div className={styles.latestItem}>
              <span
                className={styles.latestValue}
                style={{ color: qualityColor(latest.quality) }}
              >
                {qualityLabel(latest.quality)}
              </span>
              <span className={styles.latestUnit}>睡眠の質</span>
            </div>
            <div className={styles.latestItem}>
              <span className={styles.latestValue}>{latest.bedTime}</span>
              <span className={styles.latestUnit}>就寝時刻</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.emptyCard}>
          <p>まだ記録がありません</p>
          <button className={styles.startBtn} onClick={onNavigateRecord}>
            最初の記録をする ✏️
          </button>
        </div>
      )}

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>⏱️</span>
          <span className={styles.statValue}>{formatDuration(stats.averageDuration)}</span>
          <span className={styles.statLabel}>平均睡眠時間</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>⭐</span>
          <span className={styles.statValue}>{stats.averageQuality || '—'}</span>
          <span className={styles.statLabel}>平均品質</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>🔥</span>
          <span className={styles.statValue}>{stats.currentStreak}</span>
          <span className={styles.statLabel}>連続記録日数</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📝</span>
          <span className={styles.statValue}>{stats.totalRecords}</span>
          <span className={styles.statLabel}>総記録数</span>
        </div>
      </div>

      {chartData.length > 1 && (
        <div className={styles.chartCard}>
          <p className={styles.cardLabel}>直近7日間の睡眠時間 (時間)</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis domain={[0, 12]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#e2e8f0' }}
                formatter={(v: number) => [`${v}時間`, '睡眠時間']}
              />
              <Area type="monotone" dataKey="duration" stroke="#818cf8" fill="url(#sleepGrad)" strokeWidth={2} dot={{ fill: '#818cf8', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
