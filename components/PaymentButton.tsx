'use client'
import { useEffect } from "react";

export default function PaymentButton() {

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // Create order from backend
    const orderRes = await fetch("/api/razorpay-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ amount: 99, userId: 'user_2yJ52llksMKT7kjrPbZdK5XcH93' }),

    });

    const { order } = await orderRes.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // add this in your env
      amount: order.amount,
      currency: order.currency,
      name: "Quality Keeper Pro Plan",
      description: "Unlimited access to all features",
      order_id: order.id,
      handler: async function (response: any) {
        alert("Payment Successful!");
        // TODO: Call backend to mark user as Pro
        console.log(response);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
      },
      theme: {
        color: "#6366F1",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className=" flex items-center justify-center ">
      <button
        onClick={handlePayment}
        className="bg-indigo-600 text-white px-2 py-2 rounded-lg shadow-lg text-sm"
      >
        Upgrade to Pro – ₹99
      </button>
    </div>
  );
}
