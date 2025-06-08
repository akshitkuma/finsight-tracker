import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'  // import singleton prisma client

export async function GET() {
  try {
    const budgets = await prisma.budget.findMany()
    return NextResponse.json(budgets)
  } catch (error) {
    console.error('GET /api/budgets error:', error)
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const budget = await prisma.budget.create({
      data: {
        category: body.category,
        month: new Date(body.month),
        amount: parseFloat(body.amount),
      },
    })
    return NextResponse.json(budget)
  } catch (error) {
    console.error('POST /api/budgets error:', error)
    return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 })
  }
}
