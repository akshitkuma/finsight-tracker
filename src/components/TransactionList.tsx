'use client'
import { useState } from 'react'

export default function TransactionList({ transactions, onDelete, onEdit }: any) {
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ amount: '', date: '', description: '' })

  const startEdit = (t: any) => {
    setEditId(t.id)
    setForm({
      amount: t.amount,
      date: t.date.slice(0, 10),
      description: t.description,
    })
  }

  const handleUpdate = () => {
    onEdit({ id: editId, ...form })
    setEditId(null)
  }

  return (
    <ul className="mt-4 space-y-2">
      {transactions.map((t: any) => (
        <li key={t.id} className="border p-2 rounded shadow">
          {editId === t.id ? (
            <div className="space-y-2">
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="border p-1 w-full"
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="border p-1 w-full"
              />
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border p-1 w-full"
              />
              <div className="flex gap-2">
                <button onClick={handleUpdate} className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
                <button onClick={() => setEditId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p className="font-semibold">{t.description}</p>
              <p>₹{t.amount} – {new Date(t.date).toLocaleDateString()}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => startEdit(t)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => onDelete(t.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}
