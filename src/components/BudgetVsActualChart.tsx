'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function BudgetVsActualChart({ budgets, transactions }: any) {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const actuals = transactions.reduce((acc: any, t: any) => {
    const date = new Date(t.date)
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      acc[t.category] = (acc[t.category] || 0) + t.amount
    }
    return acc
  }, {})

  const chartData = budgets
    .filter((b: any) => {
      const date = new Date(b.month)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .map((b: any) => ({
      category: b.category,
      budget: b.amount,
      actual: actuals[b.category] || 0,
    }))

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">📈 Budget vs. Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" />
          <Bar dataKey="actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
