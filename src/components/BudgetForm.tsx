'use client'

import { useState } from 'react'

const categories = ['Food', 'Rent', 'Travel', 'Bills', 'Shopping', 'Other']

export default function BudgetForm({ onSubmit }: any) {
  const [form, setForm] = useState({
    category: '',
    month: '',
    amount: '',
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
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
          <option key={cat} value={cat}>{cat}</option>
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
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Set Budget</button>
    </form>
  )
}
