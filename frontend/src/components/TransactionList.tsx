'use client';

import React from 'react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Props {
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<Props> = ({ transactions, deleteTransaction }) => {
  // 日付の新しい順に並び替え
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">履歴</h2>
      <ul className="space-y-2">
        {sortedTransactions.map((tx) => (
          <li
            key={tx.id}
            className={`flex justify-between items-center border-l-4 p-3 rounded ${
              tx.type === 'income' ? 'border-green-500' : 'border-red-500'
            } bg-gray-50`}
          >
            <div>
              <div className="text-sm font-medium">{tx.category}</div>
              <div className="text-xs text-gray-500">{tx.description}</div>
              <div className="text-xs text-gray-400">{tx.date}</div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`font-semibold ${
                  tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {tx.type === 'income' ? '+' : '-'}¥{tx.amount.toLocaleString()}
              </span>
              <button
                onClick={() => deleteTransaction(tx.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;


