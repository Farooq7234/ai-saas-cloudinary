// app/api/clerk-webhook/route.ts (or /pages/api if using pages dir)
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const eventType = body.type;
  const data = body.data;

  if (eventType === "user.created") {
    const userId = data.id;

    await prisma.user.create({
      data: {
        id: userId, // Clerk user ID
        isPro: false,
      },
    });
  }

  return NextResponse.json({ message: "Handled" }, { status: 200 });
}
