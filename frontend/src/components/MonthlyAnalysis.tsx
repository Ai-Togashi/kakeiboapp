'use client';

import { useEffect, useState } from 'react';

type Transaction = {
  id: number;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string; // ISO形式: 2025-04-25T00:00:00.000Z
  note?: string;
};

type Props = {
  transactions: Transaction[];
};

export default function MonthlyAnalysis({ transactions }: Props) {
  const [selectedMonth, setSelectedMonth] = useState('2025-04');
  const [incomeData, setIncomeData] = useState<Transaction[]>([]);
  const [expenseData, setExpenseData] = useState<Transaction[]>([]);

  useEffect(() => {
    const filtered = transactions.filter((tx) => {
      const month = new Date(tx.date).toISOString().slice(0, 7); // '2025-04'
      return month === selectedMonth;
    });

    setIncomeData(filtered.filter((tx) => tx.type === 'income'));
    setExpenseData(filtered.filter((tx) => tx.type === 'expense'));
  }, [transactions, selectedMonth]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">月別分析</h2>

      <div className="mb-4">
        <label>対象月: </label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="2025-04">2025-04</option>
          <option value="2025-05">2025-05</option>
          <option value="2025-06">2025-06</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-lg">支出</h3>
          {expenseData.length === 0 ? (
            <p>選択月の支出データがありません</p>
          ) : (
            <ul className="mt-2">
              {expenseData.map((tx) => (
                <li key={tx.id} className="text-red-600">
                  {tx.category} - ¥{tx.amount.toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg">収入</h3>
          {incomeData.length === 0 ? (
            <p>選択月の収入データがありません</p>
          ) : (
            <ul className="mt-2">
              {incomeData.map((tx) => (
                <li key={tx.id} className="text-green-600">
                  {tx.category} - ¥{tx.amount.toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
