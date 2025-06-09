// src/types.ts

export type BudgetType = {
  id?: string   // optional because new budgets may not have id yet
  category: string
  month: string // format: 'YYYY-MM'
  amount: number
}

export type TransactionType = {
  id?: string
  category: string
  amount: number
  date: string  // ISO string or 'YYYY-MM-DD'
}
