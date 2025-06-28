export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;    // ISO文字列
  memo?: string;
}
