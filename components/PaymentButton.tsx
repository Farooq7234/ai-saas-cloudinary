'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { useToast } from '@/hooks/use-toast'

export default function PaymentButton() {
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const { toast } = useToast()
  const [isPro, setIsPro] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  const fetchUserStatus = async () => {
    try {   
      const response = await fetch("/api/user-status", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user status')
      }

      const data = await response.json()
      if (!data || typeof data.isPro !== 'boolean') {
        throw new Error('Invalid response format')
      }
      setIsPro(data.isPro)
    } catch (error) {
      console.error("Error fetching user status:", error)
      // Set to false on error so button shows (fail-safe)
      setIsPro(false)
    } finally {
      setCheckingStatus(false)
    }
  }

  useEffect(() => {
    fetchUserStatus()
  }, [])

  const confettiTrigger = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
 
    const frame = () => {
      if (Date.now() > end) return;
 
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
 
      requestAnimationFrame(frame);
    };
 
    frame();
  };
  
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
        toast({
          title: "Razorpay SDK failed to load",
        })
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
                userId: user?.id, // Add userId to verify-payment call
              }),
            })
            
            if (verifyRes.ok) {
              toast({
                title: "Payment successful! You are now a Pro user.",   
                variant: "default",
              })
              confettiTrigger()
              // Update local state to hide button
              setIsPro(true)
            } else {
              toast({
                title: "Payment verification failed!",
                variant: "destructive",
              })  
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            toast({
              title: "Payment verification failed!",
              variant: "destructive",
            })
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        },
        prefill: {
          name: user?.fullName || "User",
          email: user?.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#6366F1",
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Show loading while checking status
  if (checkingStatus) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">
          Checking status...
        </div>
      </div>
    )
  }

  // Don't show anything if user is already Pro
  if (isPro) {
    return null
  }

  // Show payment button only for non-Pro users
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2 rounded-lg shadow-lg text-sm transition-colors"
      >
        {loading ? "Processing..." : "Upgrade to Pro - ₹99"}
      </button>
    </div>
  )
}