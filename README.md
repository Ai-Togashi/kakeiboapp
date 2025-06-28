# 家計簿アプリ – KakeiboApp

このアプリは、収支の記録・可視化・月別分析を通じて、効率的な家計管理を支援するフルスタックWebアプリケーションです。フロントエンドは Next.js（TypeScript + Tailwind CSS）、バックエンドは Express.js（Prisma + PostgreSQL）を採用しています。

---

## 📁 ディレクトリ構成

```bash
kakeiboapp/
├── backend/                       # バックエンド（Express + Prisma）
│   ├── node_modules/
│   ├── prisma/                    # Prisma 関連
│   │   ├── migrations/            # マイグレーション履歴
│   │   └── schema.prisma          # Prisma スキーマ定義
│   ├── src/
│   │   ├── controllers/           # 取引関連のビジネスロジック
│   │   │   └── transactionController.ts
│   │   ├── middlewares/           # ミドルウェア（バリデーション・エラー処理）
│   │   │   ├── errorHandler.ts
│   │   │   └── validateTransaction.ts
│   │   ├── routes/                # Express ルート定義
│   │   │   └── transactionRoutes.ts
│   │   └── utils/                 # Prisma Client 等のユーティリティ
│   │       ├── prismaClient.ts
│   │       └── index.ts
│   ├── .env                       # 環境変数
│   ├── Dockerfile                 # バックエンド用 Dockerfile
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── vitest.config.js
│
├── frontend/                      # フロントエンド（Next.js + Tailwind CSS）
│   ├── .next/                     # Next.js のビルドキャッシュ
│   ├── app/                       # App Router ルート（Next.js v13+）
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── src/
│   │   ├── components/            # コンポーネント群
│   │   │   ├── ui/                # 汎用 UI パーツ
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   └── tabs.tsx
│   │   │   ├── AddForm.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MonthlyAnalysis.tsx
│   │   │   ├── MonthlyPieChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   ├── SummaryCards.tsx
│   │   │   ├── TabNav.tsx
│   │   │   └── TransactionList.tsx
│   │   ├── hooks/                 # React カスタムフック
│   │   │   └── useTransactions.ts
│   │   └── lib/                   # API・スキーマ定義などのロジック層
│   │       ├── api.ts
│   │       ├── constants.ts
│   │       ├── transactionSchema.ts
│   │       ├── types.ts
│   │       ├── utils.ts
│   │       └── index.ts
│   ├── .env
│   ├── .env.docker
│   ├── .env.local
│   ├── Dockerfile                 # フロントエンド用 Dockerfile
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── .eslintrc.js
│   ├── .prettierrc
│   └── .gitignore
│
├── docker-compose.yml           　# サービス統合管理
├── .env                           # 全体で使用する環境変数
├── .gitignore
└── README

```

---

## 🚀 使用技術

### フロントエンド
- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Chart.js（円グラフ/棒グラフ）

### バックエンド
- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)（バリデーション）

### インフラ・環境
- Docker / Docker Compose
- .env による環境変数管理

---

## ⚙️ セットアップ手順

このプロジェクトは Docker Compose により、フロントエンド・バックエンド・データベースを一括で起動できます。


### 1. リポジトリをクローン

```bash
git clone https://github.com/Ai-Togashi/kakeiboapp.git
cd kakeiboapp
```

### 2. 環境変数ファイル（.env）を作成
ルート、および backend / frontend ディレクトリ配下に .env ファイルを作成します。

✅ ルート .env

```bash
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/kakeibo
```

✅ backend/.env

```bash
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/kakeibo
```

✅ frontend/.env.local

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```


### 3. Docker イメージをビルド＆起動

```bash
docker-compose up --build

Frontend: http://localhost:3000

Backend: http://localhost:5000

```


### 4. Prisma マイグレーション実行
初回起動後、Prisma によるデータベーススキーマを適用します。

```bash
docker exec -it kakeiboapp-backend-1 npx prisma migrate dev --name init
```

または（手動適用の場合）
```bash
cd backend
npx prisma migrate dev --name init
```


### 5. 開発モードで起動するとき

### フロントエンド

```bash
cd frontend
npm install
npm run dev
```

### バックエンド

```bash
cd backend
npm install
npm run dev
```

### 6. ESLint & Prettier のコードチェック

```bash
npm run lint
npm run format
```

### 動作確認

１．ブラウザで http://localhost:3000 にアクセス

２．フォームから収支を追加

３．グラフにデータが反映されるか確認

---

##　ライセンス

このプロジェクトは [MIT ライセンス](https://opensource.org/licenses/MIT) のもとで公開されています。  

---

##  作者

** (GitHub: [冨樫あい](https://github.com/Ai-Togashi)) **  
Webエンジニア志望 / フルスタック開発者  
フロントエンド・バックエンド・インフラまで幅広く学習・実践中です。  
お気軽にフォロー・コラボ・フィードバックください！

---
