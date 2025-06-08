'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

export default function TransactionChart({ data }: any) {
  const chartData = Object.entries(
    data.reduce((acc: any, t: any) => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short' })
      acc[month] = (acc[month] || 0) + t.amount
      return acc
    }, {})
  ).map(([month, amount]) => ({ month, amount }))

  return (
    <BarChart width={320} height={200} data={chartData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="amount" fill="#4f46e5" />
    </BarChart>
  )
}
