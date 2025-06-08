'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a2d2ff', '#ffafcc', '#d4a5a5', '#ffd6a5']

export default function CategoryPieChart({ data }: { data: any[] }) {
  // Group transactions by category
  const grouped = data.reduce((acc: any, t: any) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})

  // Convert to array format for Recharts
  const chartData = Object.entries(grouped).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  if (chartData.length === 0) return <p className="mt-4 text-gray-500">No data to display in chart.</p>

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2 text-center">📊 Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
