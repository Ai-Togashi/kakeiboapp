import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateTransaction } from '../middlewares/validateTransaction';
import { validationResult } from 'express-validator';

export const prisma = new PrismaClient();
const router = Router();

// GET /transactions
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'desc' },
    });
    res.status(200).json(transactions);
  } catch (err) {
    console.error('💥 GET /transactions error:', err);
    next(err);
  }
});

// POST /transactions
router.post(
  '/',
  validateTransaction,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { amount, category, type, date } = req.body;

const transaction = await prisma.transaction.create({
  data: {
    amount: Number(amount), 
    category,
    type,
    date: new Date(date).toISOString(), 
  }
});

res.status(201).json(transaction);
    } catch (err) {
      console.error('💥 POST /transactions error:', err);
      next(err);
    }
  }
);

// DELETE /transactions/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.transaction.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }

    await prisma.transaction.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    console.error('💥 DELETE /transactions/:id error:', err);
    next(err);
  }
});

export default router;



