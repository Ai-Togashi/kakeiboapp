'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

type Transaction = {
  id: number;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string; // ISO 8601
};

type Props = {
  transactions: Transaction[];
};

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#8884d8', '#82ca9d', '#ffc658', '#d0ed57',
];

export default function MonthlyPieChart({ transactions }: Props) {
  const [selectedMonth, setSelectedMonth] = useState('2025-04');
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [expenseData, setExpenseData] = useState<any[]>([]);

  useEffect(() => {
    const filtered = transactions.filter((tx) => {
      const month = new Date(tx.date).toISOString().slice(0, 7);
      return month === selectedMonth;
    });

    const groupByCategory = (type: 'income' | 'expense') => {
      const map = new Map<string, number>();
      filtered
        .filter((tx) => tx.type === type)
        .forEach((tx) => {
          map.set(tx.category, (map.get(tx.category) || 0) + tx.amount);
        });
      return Array.from(map.entries()).map(([category, amount]) => ({
        name: category,
        value: amount,
      }));
    };

    setIncomeData(groupByCategory('income'));
    setExpenseData(groupByCategory('expense'));
  }, [transactions, selectedMonth]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="mb-4">
        <label className="mr-2">対象月：</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="2025-04">2025-04</option>
          <option value="2025-05">2025-05</option>
          <option value="2025-06">2025-06</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        <div className="w-full h-80">
          <h3 className="text-lg font-semibold text-center mb-2">収入の内訳</h3>
          {incomeData.length === 0 ? (
            <p className="text-center text-gray-500">データがありません</p>
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={incomeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {incomeData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="w-full h-80">
          <h3 className="text-lg font-semibold text-center mb-2">支出の内訳</h3>
          {expenseData.length === 0 ? (
            <p className="text-center text-gray-500">データがありません</p>
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {expenseData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
