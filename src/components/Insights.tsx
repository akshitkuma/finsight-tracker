import React from 'react'

interface Budget {
  category: string
  month: string | Date
  amount: number
}

interface Transaction {
  category: string
  amount: number
  date: string | Date
}

interface Insight {
  category: string
  budget: number
  spent: number
  overBudget: boolean
}

interface InsightsProps {
  budgets: Budget[]
  transactions: Transaction[]
}

export default function Insights({ budgets, transactions }: InsightsProps) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  // Calculate actual spending per category for the current month
  const actuals = transactions.reduce<Record<string, number>>((acc, t) => {
    const date = new Date(t.date)
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      acc[t.category] = (acc[t.category] || 0) + t.amount
    }
    return acc
  }, {})

  // Prepare insights based on budgets and actual spending
  const insights: Insight[] = budgets
    .filter(b => {
      const date = new Date(b.month)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .map(b => {
      const spent = actuals[b.category] || 0
      return {
        category: b.category,
        budget: b.amount,
        spent,
        overBudget: spent > b.amount,
      }
    })

  // Find the category with highest spending
  const topCategory = insights.reduce<Insight | null>(
    (prev, curr) => (prev === null || curr.spent > prev.spent ? curr : prev),
    null
  )

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3 text-blue-700">💡 Spending Insights</h2>
      {insights.length === 0 ? (
        <p>No budget data for the current month.</p>
      ) : (
        <>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            {insights.map(i => (
              <li key={i.category} className={i.overBudget ? 'text-red-600 font-semibold' : ''}>
                {i.category}: Spent ₹{i.spent.toFixed(2)} / Budget ₹{i.budget.toFixed(2)}{' '}
                {i.overBudget && <span>(Over Budget)</span>}
              </li>
            ))}
          </ul>
          {topCategory && (
            <p className="mt-4 font-medium text-gray-900">
              Top Spending Category: <span className="font-bold">{topCategory.category}</span> (₹
              {topCategory.spent.toFixed(2)})
            </p>
          )}
        </>
      )}
    </div>
  )
}
