import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET: Fetch all transactions
export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
  })
  return NextResponse.json(transactions)
}

// POST: Create new transaction
export async function POST(req: Request) {
  const body = await req.json()
  const transaction = await prisma.transaction.create({
    data: {
      amount: parseFloat(body.amount),
      date: new Date(body.date),
      description: body.description,
      category: body.category,
    },
  })
  return NextResponse.json(transaction)
}

// PUT: Update existing transaction
export async function PUT(req: Request) {
  const body = await req.json()
  const updated = await prisma.transaction.update({
    where: { id: body.id },
    data: {
      amount: parseFloat(body.amount),
      date: new Date(body.date),
      description: body.description,
      category: body.category,
    },
  })
  return NextResponse.json(updated)
}

// DELETE: Delete transaction by ID
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

  await prisma.transaction.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
