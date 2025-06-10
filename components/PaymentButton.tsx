'use client'


import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function PaymentButton() {
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  
  // Move auth() to useEffect or make this a server component wrapper
  // For now, let's handle this differently
  
  const loadRazorpayScript = (): Promise<boolean> =>
    new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if ((window as any).Razorpay) {
        resolve(true)
        return
      }
      
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const handlePayment = async () => {
    try {
      setLoading(true)
      
      const res = await loadRazorpayScript()
      if (!res) {
        alert("Razorpay SDK failed to load.")
        return
      }

      // Create order from backend
      const orderRes = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99, userId: user?.id }),
      })

      if (!orderRes.ok) {
        throw new Error('Failed to create order')
      }

      const { order } = await orderRes.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Quality Keeper Pro Plan",
        description: "Unlimited access to all features",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })
            
            if (verifyRes.ok) {
              alert("Payment Successful!")
              // Redirect or refresh to update UI
              window.location.reload()
            } else {
              alert("Payment verification failed!")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            alert("Payment verification failed!")
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
        },
        theme: {
          color: "#6366F1",
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2 rounded-lg shadow-lg text-sm transition-colors"
      >
        {loading ? "Processing..." : "Upgrade to Pro – ₹99"}
      </button>
    </div>
  )
}