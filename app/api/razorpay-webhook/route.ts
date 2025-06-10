import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "payment.captured") {
    const paymentEntity = event.payload.payment.entity;

    // Use notes field or some mapping to find the user
    const userId = paymentEntity.notes?.userId;

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID in payment notes" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: 'user_2yJ52llksMKT7kjrPbZdK5XcH93' },
      data: { isPro: true },
    });
  }

  return NextResponse.json({ status: "ok" });
}
