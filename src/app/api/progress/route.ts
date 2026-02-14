import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: load user progress
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { checkedItems: true, completedDays: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    checkedItems: JSON.parse(user.checkedItems),
    completedDays: JSON.parse(user.completedDays),
  });
}

// POST: save user progress
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { checkedItems, completedDays } = await request.json();

    await prisma.user.update({
      where: { id: session.userId },
      data: {
        checkedItems: JSON.stringify(checkedItems),
        completedDays: JSON.stringify(completedDays),
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}
