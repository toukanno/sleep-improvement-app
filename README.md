# sleep-improvement-app
睡眠改善アプリ（React + Vite）です。

## 現在の機能
- 睡眠記録の登録（就寝/起床、質、メモ、タグ）
- ダッシュボード（平均睡眠時間・品質・連続記録日数・推移チャート）
- 履歴表示と削除
- 睡眠改善Tips表示
- ローカル保存（LocalStorage）

## 起動方法（Web）
```bash
npm install
npm run dev
```

## 起動方法（Electron）
一旦デスクトップアプリとして動かせるようにしています。

```bash
npm install
npm run desktop:dev
```

## 本番ビルド確認（Electron）
```bash
npm run desktop:start
```

> `desktop:start` は `vite build` 後に Electron で `dist/index.html` を開きます。
