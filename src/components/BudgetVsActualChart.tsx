'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Budget {
  id: string
  category: string
  month: string | Date
  amount: number
}

interface Transaction {
  category: string
  amount: number
  date: string | Date
}

interface Props {
  budgets: Budget[]
  transactions: Transaction[]
}

export default function BudgetVsActualChart({ budgets, transactions }: Props) {
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ amount: '', month: '', category: '' })

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const actuals = transactions.reduce<Record<string, number>>((acc, t) => {
    const date = new Date(t.date)
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      acc[t.category] = (acc[t.category] || 0) + t.amount
    }
    return acc
  }, {})

  const chartData = budgets
    .filter(b => {
      const date = new Date(b.month)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .map(b => ({
      id: b.id,
      category: b.category,
      Budget: b.amount,
      Actual: actuals[b.category] || 0,
    }))

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/budgets?id=${id}`, { method: 'DELETE' })
    if (res.ok) location.reload()
  }

  const startEdit = (item: typeof chartData[0]) => {
    setEditing(item.id)
    setForm({
      amount: item.Budget.toString(),
      month: new Date().toISOString().slice(0, 7),
      category: item.category,
    })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/budgets', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: editing }),
    })
    if (res.ok) {
      setEditing(null)
      location.reload()
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3 text-blue-700">📊 Budget vs Actual</h2>
      {chartData.length === 0 ? (
        <p>No budget data available.</p>
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
                <form key={item.id} onSubmit={handleEditSubmit} className="space-x-2 flex flex-wrap">
                  <input
                    type="number"
                    value={form.amount}
                    onChange={e => setForm({ ...form, amount: e.target.value })}
                    className="border p-1 rounded w-24"
                  />
                  <input
                    type="month"
                    value={form.month}
                    onChange={e => setForm({ ...form, month: e.target.value })}
                    className="border p-1 rounded w-40"
                  />
                  <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="text-gray-600"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <li key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span>
                    <strong>{item.category}</strong> — Budget ₹{item.Budget.toFixed(2)}, Spent ₹{item.Actual.toFixed(2)}
                  </span>
                  <div className="space-x-2">
                    <button onClick={() => startEdit(item)} className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">
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
