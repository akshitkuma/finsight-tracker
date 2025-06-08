'use client'

import { useState } from 'react'

const categories = ['Food', 'Rent', 'Travel', 'Bills', 'Shopping', 'Other']

export default function TransactionForm({ onSubmit }: any) {
  const [form, setForm] = useState({
    amount: '',
    date: '',
    description: '',
    category: '',
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!form.amount || !form.date || !form.description || !form.category) return
    onSubmit(form)
    setForm({ amount: '', date: '', description: '', category: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
        required
      />
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
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Add</button>
    </form>
  )
}

