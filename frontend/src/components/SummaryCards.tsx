'use client';

import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalIncome, totalExpense, balance }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded shadow p-4 flex items-center space-x-4">
        <Wallet className="text-blue-500" />
        <div>
          <p className="text-gray-500 text-sm">残高</p>
          <p className="text-lg font-bold">¥{balance.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 flex items-center space-x-4">
        <TrendingUp className="text-green-500" />
        <div>
          <p className="text-gray-500 text-sm">収入</p>
          <p className="text-lg font-bold text-green-600">¥{totalIncome.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 flex items-center space-x-4">
        <TrendingDown className="text-red-500" />
        <div>
          <p className="text-gray-500 text-sm">支出</p>
          <p className="text-lg font-bold text-red-600">¥{totalExpense.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;


