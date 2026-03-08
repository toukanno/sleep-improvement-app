export interface SleepRecord {
  id: string;
  date: string; // YYYY-MM-DD
  bedTime: string; // HH:mm
  wakeTime: string; // HH:mm
  quality: 1 | 2 | 3 | 4 | 5; // 1=最悪, 5=最高
  notes: string;
  tags: SleepTag[];
}

export type SleepTag =
  | 'カフェイン'
  | 'アルコール'
  | '運動'
  | 'ストレス'
  | 'スマホ'
  | '昼寝'
  | 'お風呂';

export interface SleepStats {
  averageDuration: number; // minutes
  averageQuality: number;
  totalRecords: number;
  longestStreak: number;
  currentStreak: number;
}

export type Page = 'dashboard' | 'record' | 'history' | 'tips';
