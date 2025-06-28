'use client';

import { Dispatch, SetStateAction } from 'react';

type FormData = {
  type: 'income' | 'expense';
  amount: string;
  category: string;
  description: string;
  date: string;
};

type Props = {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  addTransaction: () => Promise<void>;
  incomeCategories: string[];
  expenseCategories: string[];
  errors: { [key: string]: string };
};

export default function AddForm({
  formData,
  setFormData,
  addTransaction,
  incomeCategories,
  expenseCategories,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTransaction();
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <button
          type="button"
          className={`px-4 py-2 rounded ${
            formData.type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFormData({ ...formData, type: 'income' })}
        >
          収入
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded ${
            formData.type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFormData({ ...formData, type: 'expense' })}
        >
          支出
        </button>
      </div>

      <input
        type="number"
        name="amount"
        placeholder="金額"
        className="w-full border p-2 rounded"
        required
        value={formData.amount ?? ''}
        onChange={handleChange}
      />

      <select
        name="category"
        className="w-full border p-2 rounded"
        required
        value={formData.category ?? ''}
        onChange={handleChange}
      >
        <option value="">カテゴリを選択</option>
        {(formData.type === 'income' ? incomeCategories : expenseCategories).map(
          (cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          )
          )}
        </select>
  
        <input
          type="text"
          name="description"
          placeholder="内容"
          className="w-full border p-2 rounded"
          required
          value={formData.description ?? ''}
          onChange={handleChange}
        />
  
        <input
          type="date"
          name="date"
          className="w-full border p-2 rounded"
          required
          value={formData.date ?? ''}
          onChange={handleChange}
        />
  
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          追加
        </button>
      </form>
    );
  }
