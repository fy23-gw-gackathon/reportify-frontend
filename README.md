# reportify frontend

![CI](https://github.com/fy23-gw-gackathon/reportify-frontend/workflows/CI/badge.svg)
![Deploy](https://github.com/fy23-gw-gackathon/reportify-frontend/workflows/Deploy/badge.svg)
![version](https://img.shields.io/badge/version-1.0--SNAPSHOT-blue.svg)

## 開発環境

- Node.js 18
- Next.js 13

## 開発サーバの起動

起動に成功すると [localhost:3000](http://localhost:3000) からアクセスできます。

```sh
$ npm run dev
```

###ビルド方法

ビルドに成功すると `out` 直下に静的コンテンツが生成されます。

```sh
$ npm run build
$ npm run export
```

## REST API のモックサーバを起動

起動に成功すると [localhost:8080](http://localhost:8080) から [openapi.yml](./openapi.yml) に定義された REST API を利用できます。

```shell
$ docker run --rm -it -p 8080:4010 -v $PWD:/tmp stoplight/prism:4 mock -h 0.0.0.0 /tmp/openapi.yml
```

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
