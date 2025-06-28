import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export const getTransactions = async (_req: Request, res: Response) => {
  try {
    const txs = await prisma.transaction.findMany({ orderBy: { date: 'desc' } });
    res.json(txs);
  } catch {
    res.status(500).json({ error: 'Failed to fetch transactions.' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount, category, date } = req.body;
    const tx = await prisma.transaction.create({
      data: { type, amount, category, date: new Date(date) }
    });
    res.status(201).json(tx);
  } catch {
    res.status(500).json({ error: 'Failed to create transaction.' });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { type, amount, category, date } = req.body;
    const tx = await prisma.transaction.update({
      where: { id },
      data: { type, amount, category, date: new Date(date) }
    });
    res.json(tx);
  } catch {
    res.status(500).json({ error: 'Failed to update transaction.' });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.transaction.delete({
      where: { id }
    });
    res.json({ message: 'Transaction deleted successfully.' });
  } catch {
    res.status(500).json({ error: 'Failed to delete transaction.' });
  }
};
