import { z } from 'zod';

// const transactionSchema = z.object({
//   amount: z.coerce.number(),
//   category: z.string(),
//   type: z.enum(["income", "expense"]),
//   date: z.string(),
// });

export const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.string().min(1, '金額を入力してください').refine(val => parseFloat(val) > 0, {
    message: '金額は0より大きい必要があります',
  }),
  category: z.string().min(1, 'カテゴリを選択してください'),
  description: z.string().optional(),
  date: z.string().min(1, '日付を選択してください'),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
