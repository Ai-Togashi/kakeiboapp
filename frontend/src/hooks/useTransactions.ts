import { useEffect, useState } from 'react';

export type Transaction = {
  id: number;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/`);
      const data = await res.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  return { transactions, setTransactions };
};
