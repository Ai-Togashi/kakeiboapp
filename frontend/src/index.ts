// src/index.ts

import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ヘルスチェック
app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

// 例: ユーザー一覧取得
app.get('/users', async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '内部サーバーエラー' });
  }
});

// サーバ起動
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
