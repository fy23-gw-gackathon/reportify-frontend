# reportify frontend

![CI](https://github.com/fy23-gw-gackathon/reportify-frontend/workflows/CI/badge.svg)
![Deploy](https://github.com/fy23-gw-gackathon/reportify-frontend/workflows/Deploy/badge.svg)
![version](https://img.shields.io/badge/version-1.0--SNAPSHOT-blue.svg)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## コードアーキテクチャ


参考：https://github.com/wadeen/nextjs-blog/tree/main

- `src/components`: ボタンなどのUIコンポーネントを保存する場所
- `src/entities`: (主にAPIから渡ってくる)データモデルを定義
- `src/hooks`: 各ページやコンポーネントで使用するカスタムReact Hooksを定義
- `src/pages`: 各ページ用のファイルを格納
    - `_app.tsx`と`_document.tsx`以外はファイルパスを元にURLエンドポイントが設定される
- `src/services`: APIとの通信や、データを加工する処理などの処理を格納
- `src/stores`: 主にRecoilで扱うグローバルStateを格納
- `src/styles`: CSSを格納
- `src/utils`: 共通で使えるメソッドやツールを定義
