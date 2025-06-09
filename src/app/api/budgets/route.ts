import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // To avoid caching issues

// GET: Fetch all budgets ordered by month descending
export async function GET() {
  try {
    const budgets = await prisma.budget.findMany({
      orderBy: { month: "desc" },
    });
    return NextResponse.json(budgets);
  } catch (error) {
    console.error("GET /api/budgets error:", error);
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

// POST: Create new budget or update if category + month exists
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const existing = await prisma.budget.findFirst({
      where: {
        category: body.category,
        month: new Date(body.month),
      },
    });

    if (existing) {
      const updated = await prisma.budget.update({
        where: { id: existing.id },
        data: {
          amount: parseFloat(body.amount),
        },
      });
      return NextResponse.json(updated);
    }

    const budget = await prisma.budget.create({
      data: {
        category: body.category,
        month: new Date(body.month),
        amount: parseFloat(body.amount),
      },
    });
    return NextResponse.json(budget);
  } catch (error) {
    console.error("POST /api/budgets error:", error);
    return NextResponse.json({ error: "Failed to create budget" }, { status: 500 });
  }
}

// PUT: Update budget by id
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, amount, month, category } = body;

    if (!id) {
      return NextResponse.json({ error: "Budget id required" }, { status: 400 });
    }

    const updated = await prisma.budget.update({
      where: { id },
      data: {
        amount: parseFloat(amount),
        month: new Date(month),
        category,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/budgets error:", error);
    return NextResponse.json({ error: "Failed to update budget" }, { status: 500 });
  }
}

// DELETE: Delete budget by id (query param)
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Budget id required" }, { status: 400 });
    }

    await prisma.budget.delete({ where: { id } });
    return NextResponse.json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/budgets error:", error);
    return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 });
  }
}

