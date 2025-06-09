'use client'

import { useEffect, useState } from 'react'
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'
import TransactionChart from '@/components/TransactionChart'
import BudgetForm from '@/components/BudgetForm'
import BudgetVsActualChart from '@/components/BudgetVsActualChart'
import Insights from '@/components/Insights'
import CategoryPieChart from '@/components/CategoryPieChart'
import { TransactionType, BudgetType } from '@/types'

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const [budgets, setBudgets] = useState<BudgetType[]>([])
  const [editingBudget, setEditingBudget] = useState<BudgetType | null>(null)

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to fetch transactions')
      const data = await res.json()
      setTransactions(data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchBudgets = async () => {
    try {
      const res = await fetch('/api/budgets', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to fetch budgets')
      const data = await res.json()
      setBudgets(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTransactions()
    fetchBudgets()
  }, [])

  const addTransaction = async (transaction: TransactionType) => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      })
      if (!res.ok) throw new Error('Failed to add transaction')
      fetchTransactions()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      const res = await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete transaction')
      fetchTransactions()
    } catch (error) {
      console.error(error)
    }
  }

  const editTransaction = async (updated: TransactionType) => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (!res.ok) throw new Error('Failed to update transaction')
      fetchTransactions()
    } catch (error) {
      console.error(error)
    }
  }

  const addOrEditBudget = async (budget: BudgetType) => {
    try {
      const method = budget.id ? 'PUT' : 'POST'
      const res = await fetch('/api/budgets', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(budget),
      })
      if (!res.ok) throw new Error('Failed to submit budget')
      fetchBudgets()
      setEditingBudget(null)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteBudget = async (id: string) => {
    try {
      const res = await fetch(`/api/budgets?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete budget')
      fetchBudgets()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 font-sans text-gray-900 flex flex-col items-center justify-start py-10 px-4">
      <main className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 sm:p-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow-md">
          FinSight – Personal Finance Tracker
        </h1>

        <TransactionForm onSubmit={addTransaction} />

        <section className="my-8">
          <TransactionChart data={transactions} />
        </section>

        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
          onEdit={editTransaction}
        />

        <section className="mt-12">
          <BudgetForm onSubmit={addOrEditBudget} editBudget={editingBudget} />
        </section>

        <section className="mt-6">
          <BudgetVsActualChart
            budgets={budgets}
            transactions={transactions}
            onEdit={setEditingBudget}
            onDelete={deleteBudget}
          />
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Insights budgets={budgets} transactions={transactions} />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Category-wise Spending</h2>
          <CategoryPieChart data={transactions} />
        </section>
      </main>
    </div>
  )
}
