import { SleepRecord, SleepStats } from '../types/sleep';

const STORAGE_KEY = 'sleep_records';

function compareRecordDesc(a: SleepRecord, b: SleepRecord): number {
  const aKey = `${a.date}T${a.bedTime}`;
  const bKey = `${b.date}T${b.bedTime}`;
  return bKey.localeCompare(aKey);
}

export function sortRecords(records: SleepRecord[]): SleepRecord[] {
  return [...records].sort(compareRecordDesc);
}

export function loadRecords(): SleepRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return sortRecords(JSON.parse(raw) as SleepRecord[]);
  } catch {
    return [];
  }
}

export function saveRecords(records: SleepRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function addRecord(record: SleepRecord): SleepRecord[] {
  const records = loadRecords();
  const updated = sortRecords([record, ...records]);
  saveRecords(updated);
  return updated;
}

export function deleteRecord(id: string): SleepRecord[] {
  const records = loadRecords().filter((r) => r.id !== id);
  saveRecords(records);
  return records;
}

export function updateRecord(updated: SleepRecord): SleepRecord[] {
  const records = sortRecords(loadRecords().map((r) => (r.id === updated.id ? updated : r)));
  saveRecords(records);
  return records;
}

/** 就寝〜起床の睡眠時間（分）を計算 */
export function calcDuration(bedTime: string, wakeTime: string): number {
  const [bh, bm] = bedTime.split(':').map(Number);
  const [wh, wm] = wakeTime.split(':').map(Number);
  let minutes = (wh * 60 + wm) - (bh * 60 + bm);
  if (minutes < 0) minutes += 24 * 60; // 日をまたぐ場合
  return minutes;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}時間${m > 0 ? m + '分' : ''}`;
}

export function calcStats(records: SleepRecord[]): SleepStats {
  if (records.length === 0) {
    return { averageDuration: 0, averageQuality: 0, totalRecords: 0, longestStreak: 0, currentStreak: 0 };
  }

  const durations = records.map((r) => calcDuration(r.bedTime, r.wakeTime));
  const averageDuration = Math.round(durations.reduce((a, b) => a + b, 0) / records.length);
  const averageQuality = Math.round((records.reduce((a, r) => a + r.quality, 0) / records.length) * 10) / 10;

  // 連続記録日数を計算
  const dates = [...new Set(records.map((r) => r.date))].sort().reverse();
  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;
  let prev: Date | null = null;

  for (const d of dates.slice().reverse()) {
    const cur = new Date(d);
    if (prev === null) {
      streak = 1;
    } else {
      const diff = (cur.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else {
        streak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, streak);
    prev = cur;
  }

  // 今日から遡って連続チェック
  const todayStr = new Date().toISOString().slice(0, 10);
  const dateSet = new Set(dates);
  let checkDate = new Date(todayStr);
  while (dateSet.has(checkDate.toISOString().slice(0, 10))) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return { averageDuration, averageQuality, totalRecords: records.length, longestStreak, currentStreak };
}

export function qualityLabel(q: number): string {
  const labels: Record<number, string> = { 1: '最悪', 2: '悪い', 3: '普通', 4: '良い', 5: '最高' };
  return labels[q] ?? '';
}

export function qualityColor(q: number): string {
  const colors: Record<number, string> = {
    1: '#ef4444',
    2: '#f97316',
    3: '#eab308',
    4: '#22c55e',
    5: '#3b82f6',
  };
  return colors[q] ?? '#6b7280';
}
