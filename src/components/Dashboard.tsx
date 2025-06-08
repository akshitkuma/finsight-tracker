export default function Dashboard({ transactions }: any) {
  const total = transactions.reduce((sum: number, t: any) => sum + t.amount, 0)
  const recent = [...transactions].slice(0, 3)

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-bold"> Dashboard</h2>
      <p>Total This Month: ₹{total}</p>
      <div>
        <h3 className="font-semibold"> Recent Transactions</h3>
        <ul className="list-disc pl-5">
          {recent.map((t: any) => (
            <li key={t.id}>{t.description} – ₹{t.amount} ({t.category})</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
