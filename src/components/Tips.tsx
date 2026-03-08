import React from 'react';
import styles from './Tips.module.css';

interface Tip {
  icon: string;
  title: string;
  body: string;
  category: 'habit' | 'environment' | 'diet' | 'exercise';
}

const TIPS: Tip[] = [
  {
    icon: '⏰',
    title: '毎日同じ時間に寝起きする',
    body: '体内時計を整えるために、週末も含めて同じ時刻に就寝・起床することが最も効果的です。',
    category: 'habit',
  },
  {
    icon: '📱',
    title: '就寝1時間前はスマホを控える',
    body: 'スマホやPCのブルーライトはメラトニン（睡眠ホルモン）の分泌を抑制します。寝る前はスクリーン時間を減らしましょう。',
    category: 'habit',
  },
  {
    icon: '🌡️',
    title: '寝室は少し涼しく保つ',
    body: '理想的な睡眠環境の室温は16〜19℃程度です。体温が下がると自然に眠気が訪れます。',
    category: 'environment',
  },
  {
    icon: '☕',
    title: 'カフェインは14時以降避ける',
    body: 'カフェインの半減期は約5〜7時間です。午後のコーヒーや紅茶は夜間の睡眠を妨げる可能性があります。',
    category: 'diet',
  },
  {
    icon: '🛁',
    title: '就寝90分前にお風呂に入る',
    body: '入浴後に体温が下がるタイミングで眠気が高まります。40℃前後のお湯に15分程度浸かるのが理想的です。',
    category: 'habit',
  },
  {
    icon: '🏃',
    title: '定期的な有酸素運動を習慣化',
    body: '週3〜4回の有酸素運動は睡眠の質を大幅に改善します。ただし就寝2時間前の激しい運動は逆効果になることも。',
    category: 'exercise',
  },
  {
    icon: '🌿',
    title: 'アルコールは睡眠の質を下げる',
    body: 'お酒は寝つきを良くしますが、レム睡眠を妨げ、睡眠後半の質が低下します。休肝日を設けましょう。',
    category: 'diet',
  },
  {
    icon: '🌑',
    title: '部屋を暗くして寝る',
    body: '光はメラトニン分泌を抑制します。遮光カーテンやアイマスクで寝室を十分に暗くすることで深い眠りが得られます。',
    category: 'environment',
  },
  {
    icon: '🧘',
    title: '瞑想・深呼吸でリラックス',
    body: '就寝前に5〜10分の腹式呼吸や瞑想を行うと、交感神経が落ち着き寝つきが改善されます。',
    category: 'habit',
  },
  {
    icon: '🔕',
    title: '騒音は睡眠の敵',
    body: '耳栓やホワイトノイズマシンで環境音をブロックしましょう。一定の背景音（雨音など）が眠りやすい方もいます。',
    category: 'environment',
  },
];

const CATEGORY_LABEL: Record<string, string> = {
  habit: '習慣',
  environment: '環境',
  diet: '食事・飲み物',
  exercise: '運動',
};

const CATEGORY_COLOR: Record<string, string> = {
  habit: '#818cf8',
  environment: '#34d399',
  diet: '#fb923c',
  exercise: '#f472b6',
};

export const Tips: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>睡眠改善アドバイス</h1>
        <p className={styles.subtitle}>科学的根拠に基づいたヒント</p>
      </header>
      <ul className={styles.list}>
        {TIPS.map((tip, i) => (
          <li key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{tip.icon}</span>
              <span
                className={styles.category}
                style={{ color: CATEGORY_COLOR[tip.category], borderColor: CATEGORY_COLOR[tip.category] + '44' }}
              >
                {CATEGORY_LABEL[tip.category]}
              </span>
            </div>
            <h2 className={styles.tipTitle}>{tip.title}</h2>
            <p className={styles.tipBody}>{tip.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
