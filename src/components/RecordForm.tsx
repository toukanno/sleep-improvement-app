import React, { useState } from 'react';
import { SleepRecord, SleepTag } from '../types/sleep';
import styles from './RecordForm.module.css';

const ALL_TAGS: SleepTag[] = ['カフェイン', 'アルコール', '運動', 'ストレス', 'スマホ', '昼寝', 'お風呂'];

interface Props {
  onSave: (record: SleepRecord) => void;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const RecordForm: React.FC<Props> = ({ onSave }) => {
  const [date, setDate] = useState(today());
  const [bedTime, setBedTime] = useState('23:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [quality, setQuality] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<SleepTag[]>([]);
  const [saved, setSaved] = useState(false);

  const toggleTag = (tag: SleepTag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const record: SleepRecord = {
      id: generateId(),
      date,
      bedTime,
      wakeTime,
      quality,
      notes: notes.trim(),
      tags,
    };
    onSave(record);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    // フォームリセット
    setNotes('');
    setTags([]);
    setQuality(3);
  };

  const QUALITY_LABELS: Record<number, string> = {
    1: '😩 最悪',
    2: '😕 悪い',
    3: '😐 普通',
    4: '😊 良い',
    5: '😄 最高',
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>睡眠を記録</h1>
        <p className={styles.subtitle}>昨夜の睡眠を記録しましょう</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>日付</label>
          <input
            type="date"
            value={date}
            max={today()}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.timeRow}>
          <div className={styles.field}>
            <label className={styles.label}>就寝時刻 🌙</label>
            <input
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>起床時刻 ☀️</label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>睡眠の質</label>
          <div className={styles.qualityRow}>
            {([1, 2, 3, 4, 5] as const).map((q) => (
              <button
                type="button"
                key={q}
                onClick={() => setQuality(q)}
                className={`${styles.qualityBtn} ${quality === q ? styles.qualityActive : ''}`}
              >
                {QUALITY_LABELS[q]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>タグ（該当するものを選択）</label>
          <div className={styles.tagRow}>
            {ALL_TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`${styles.tagBtn} ${tags.includes(tag) ? styles.tagActive : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>メモ</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="例: 夢を見た、夜中に目が覚めた..."
            className={styles.textarea}
            rows={3}
            maxLength={300}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          {saved ? '✅ 保存しました！' : '記録を保存する'}
        </button>
      </form>
    </div>
  );
};
