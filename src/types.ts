export interface TransactionType {
  id?: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export type BudgetType = {
  id: string
  category: string
  month: string
  amount: number
}
