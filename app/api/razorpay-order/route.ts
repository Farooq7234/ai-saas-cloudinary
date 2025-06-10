// app/api/razorpay-order/route.ts
import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    // Check if Razorpay credentials are available
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Razorpay credentials not found" }, { status: 500 });
    }

    const body = await req.json();
    const { amount } = body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        userId: body.userId,  // Send the user ID to later retrieve it from webhook
      },
    });

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
