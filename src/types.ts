export interface TransactionType {
  id?: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface BudgetType {
  id?: string;
  category: string;
  amount: number;
  month: string;
}
