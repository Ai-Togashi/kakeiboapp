import { Transaction } from '../hooks/useTransactions';

export const addTransaction = async (
  transaction: Omit<Transaction, 'id'>
): Promise<Transaction> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });

  if (!res.ok) {
    throw new Error('収支の登録に失敗しました');
  }

  return res.json();
};
