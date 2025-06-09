'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { BudgetType, TransactionType } from '@/types'

interface Props {
  budgets: BudgetType[]
  transactions: TransactionType[]
  onEdit?: (budget: BudgetType) => void
  onDelete?: (id: string) => Promise<void>
}

export default function BudgetVsActualChart({
  budgets,
  transactions,
  onEdit,
  onDelete
}: Props) {
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ amount: '', month: '', category: '' })

  // ✅ Month selector (defaults to current month)
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })

  const selectedDate = new Date(selectedMonth + '-01')
  const selectedMonthNumber = selectedDate.getMonth()
  const selectedYear = selectedDate.getFullYear()

  const actuals = transactions.reduce<Record<string, number>>((acc, t) => {
    const date = new Date(t.date)
    if (
      date.getMonth() === selectedMonthNumber &&
      date.getFullYear() === selectedYear
    ) {
      acc[t.category] = (acc[t.category] || 0) + t.amount
    }
    return acc
  }, {})

  const chartData = budgets
    .filter(b => {
      const date = new Date(b.month)
      return (
        date.getMonth() === selectedMonthNumber &&
        date.getFullYear() === selectedYear
      )
    })
    .map(b => {
      if (!b.id) return null
      return {
        id: b.id,
        category: b.category,
        Budget: b.amount,
        Actual: actuals[b.category] || 0
      }
    })
    .filter(Boolean) as {
      id: string
      category: string
      Budget: number
      Actual: number
    }[]

  const handleDelete = async (id: string) => {
    if (!onDelete) return
    await onDelete(id)
  }

  const startEdit = (item: { id: string; category: string; Budget: number }) => {
    setEditing(item.id)
    setForm({
      amount: item.Budget.toString(),
      month: selectedMonth, // keep current selected month
      category: item.category
    })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing || !onEdit) return

    const updatedBudget: BudgetType = {
      id: editing,
      amount: parseFloat(form.amount),
      month: form.month,
      category: form.category
    }

    onEdit(updatedBudget)
    setEditing(null)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3 text-blue-700">📊 Budget vs Actual</h2>

      {/* ✅ Month Picker */}
      <div className="mb-4">
        <label className="font-semibold text-gray-700 mr-2">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      {chartData.length === 0 ? (
        <p>No budget data available for the selected month.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Budget" fill="#8884d8" />
              <Bar dataKey="Actual" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <ul className="mt-4 space-y-2">
            {chartData.map(item =>
              editing === item.id ? (
                <form
                  key={item.id}
                  onSubmit={handleEditSubmit}
                  className="space-x-2 flex flex-wrap"
                >
                  <input
                    type="number"
                    value={form.amount}
                    onChange={e =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    className="border p-1 rounded w-24"
                    required
                  />
                  <input
                    type="month"
                    value={form.month}
                    onChange={e =>
                      setForm({ ...form, month: e.target.value })
                    }
                    className="border p-1 rounded w-40"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="text-gray-600"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded"
                >
                  <span>
                    <strong>{item.category}</strong> — Budget ₹
                    {item.Budget.toFixed(2)}, Spent ₹
                    {item.Actual.toFixed(2)}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  )
}
