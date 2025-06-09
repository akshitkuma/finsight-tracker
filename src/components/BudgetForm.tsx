'use client'

import { useEffect, useState } from 'react'

const categories = ['Food', 'Rent', 'Travel', 'Bills', 'Shopping', 'Other']

type BudgetType = {
  id?: string
  category: string
  month: string
  amount: string
}

type Props = {
  onSubmit: (data: BudgetType) => void
  editBudget: BudgetType | null
}

export default function BudgetForm({ onSubmit, editBudget }: Props) {
  const [form, setForm] = useState<BudgetType>({
    category: '',
    month: '',
    amount: '',
  })

  useEffect(() => {
    if (editBudget) {
      setForm(editBudget)
    }
  }, [editBudget])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.category || !form.month || !form.amount) return
    onSubmit(form)
    setForm({ category: '', month: '', amount: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="month"
        name="month"
        value={form.month}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Budget Amount"
        className="w-full border p-2 rounded"
        required
        min="0"
        step="0.01"
      />

      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
        {editBudget ? 'Update Budget' : 'Set Budget'}
      </button>
    </form>
  )
}
