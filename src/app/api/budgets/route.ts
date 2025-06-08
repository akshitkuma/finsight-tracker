import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const budgets = await prisma.budget.findMany()
  return NextResponse.json(budgets)
}

export async function POST(req: Request) {
  const body = await req.json()
  const budget = await prisma.budget.create({
    data: {
      category: body.category,
      month: new Date(body.month),
      amount: parseFloat(body.amount),
    },
  })
  return NextResponse.json(budget)
}
