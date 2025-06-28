'use client';

import { useState, useEffect } from 'react';
import Header from 'src/components/Header';
import AddForm from 'src/components/AddForm';
import SummaryCards from 'src/components/SummaryCards';
import TabNav from 'src/components/TabNav';
import TransactionList from 'src/components/TransactionList';
import ChartPie from 'src/components/PieChart';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from 'recharts';
import { transactionSchema } from '@/lib/transactionSchema';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  memo?: string;
  date: string;
}

const incomeCategories = ['給与', '副業', 'ボーナス', '投資', 'その他収入'];
const expenseCategories = [
  '食費', '住居費', '光熱費', '交通費', '通信費',
  '医療費', '教育費', '娯楽費', '衣服費', '日用品', 'その他支出',
];

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'input' | 'analysis' | 'history'>('input');
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [formData, setFormData] = useState<{
    type: 'income' | 'expense';
    amount: string;
    category: string;
    description: string;
    date: string;
  }>({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // AddFormから受け取ったデータを登録する関数
  const addTransactionFromAddForm = async (data: {
    amount: string;
    category: string;
    type: 'income' | 'expense';
    date: string;
    note: string;
  }) => {
    try {
      // 必要に応じてtransactionSchemaでバリデーション
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(data.amount),
          category: data.category,
          type: data.type,
          date: new Date(data.date).toISOString(),
          note: data.note,
        }),
      });
      if (!res.ok) throw new Error('登録失敗');
      const saved = await res.json();
      setTransactions([saved, ...transactions]);
      setErrors({});
    } catch (err: any) {
      // 必要ならエラー処理
      console.error('💥 登録エラー:', err);
    }
  };

  useEffect(() => {
     console.log('✅ API URL:', process.env.NEXT_PUBLIC_API_URL);
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/`);
        if (!res.ok) throw new Error('サーバーからの応答が不正です');
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error('💥 データ取得エラー:', err);
      }
    };
    fetchTransactions();
  }, []);

  const addTransaction = async () => {
    try {
      const parsed = transactionSchema.parse(formData);
      const newTx = {
        type: parsed.type,
        amount: parseInt(parsed.amount),
        category: parsed.category,
        description: parsed.description,
        date: parsed.date,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: Number(parsed.amount),
      category: parsed.category,
      type: parsed.type,
      date: new Date(parsed.date).toISOString(), // ← ISO形式に変換
      note: parsed.description,
    }),
      });

      if (!res.ok) throw new Error('登録失敗');
      const saved = await res.json();
      setTransactions([saved, ...transactions]);

      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });

      setErrors({});
    } catch (err: any) {
      if (err.name === 'ZodError') {
        const errorMap: { [key: string]: string } = {};
        err.errors.forEach((e: any) => {
          if (e.path.length > 0) errorMap[e.path[0]] = e.message;
        });
        setErrors(errorMap);
      } else {
        console.error('💥 登録エラー:', err);
      }
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('削除失敗');
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (err) {
      console.error('💥 削除エラー:', err);
    }
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const filteredByMonth = transactions.filter(t => t.date.slice(0, 7) === selectedMonth);

  const monthlyExpenseData = expenseCategories.map(cat => ({
    name: cat,
    value: filteredByMonth.filter(t => t.type === 'expense' && t.category === cat).reduce((sum, t) => sum + t.amount, 0),
  })).filter(d => d.value > 0);

  const monthlyIncomeData = incomeCategories.map(cat => ({
    name: cat,
    value: filteredByMonth.filter(t => t.type === 'income' && t.category === cat).reduce((sum, t) => sum + t.amount, 0),
  })).filter(d => d.value > 0);

  const expenseByCategory = expenseCategories.map(cat => ({
    name: cat,
    value: transactions.filter(t => t.type === 'expense' && t.category === cat).reduce((s, t) => s + t.amount, 0),
  })).filter(item => item.value > 0);

  const incomeByCategory = incomeCategories.map(cat => ({
    name: cat,
    value: transactions.filter(t => t.type === 'income' && t.category === cat).reduce((s, t) => s + t.amount, 0),
  })).filter(item => item.value > 0);


  // 月別の収入・支出集計データ
  const monthlyData = Object.values(
    transactions.reduce((acc, tx) => {
      const month = tx.date.slice(0, 7);
      if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
      acc[month][tx.type] += tx.amount;
      return acc;
    }, {} as Record<string, { month: string; income: number; expense: number }>)
  ).sort((a, b) => a.month.localeCompare(b.month));

  const monthOptions = [...new Set(transactions.map(t => t.date.slice(0, 7)))];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header title="家計簿アプリ" subtitle="収入と支出を管理して、家計を見える化しましょう" />
        <SummaryCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'input' && (
          <>
            <AddForm
              formData={formData}
              setFormData={setFormData}
              addTransaction={addTransaction}
              incomeCategories={incomeCategories}
              expenseCategories={expenseCategories}
              errors={errors}
            />
            <TransactionList
              transactions={transactions.map(t => ({
                ...t,
                id: String(t.id),
                description: (t as any).description ?? (t as any).memo ?? '',
              }))}
              deleteTransaction={(id: string) => deleteTransaction(Number(id))}
            />
          </>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-4">
            <div className="text-right">
              <label className="mr-2">対象月：</label>
              <select
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                {monthOptions.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {monthlyExpenseData.length > 0 ? (
                <ChartPie data={monthlyExpenseData} title="カテゴリ別支出" />
              ) : (
                <p className="text-center">選択月の支出データがありません</p>
              )}
              {monthlyIncomeData.length > 0 ? (
                <ChartPie data={monthlyIncomeData} title="カテゴリ別収入" />
              ) : (
                <p className="text-center">選択月の収入データがありません</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {expenseByCategory.length > 0 ? (
                <ChartPie data={expenseByCategory} title="全期間支出" />
              ) : (
                <p className="text-center">支出データがありません</p>
              )}
              {incomeByCategory.length > 0 ? (
                <ChartPie data={incomeByCategory} title="全期間収入" />
              ) : (
                <p className="text-center">収入データがありません</p>
              )}
            </div>
            <div>
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={val => `¥${val.toLocaleString()}`} />
                    <Tooltip formatter={val => `¥${Number(val).toLocaleString()}`} />
                    <Bar dataKey="income" fill="#028760" name="収入" />
                    <Bar dataKey="expense" fill="#df7163" name="支出" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center">月別データがありません</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
