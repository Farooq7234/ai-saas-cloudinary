import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" , message:"User is not authenticated for Razorpay webhook" }, { status: 401 });
  }
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
    const razorpayCustomerId = event.payload.payment.entity.customer_id;

    // Optional: Store mapping of razorpayCustomerId to your User
    await prisma.user.update({
      where: { id: userId },
      data: { isPro: true },
    });
  }

  return NextResponse.json({ status: "ok" });
}
