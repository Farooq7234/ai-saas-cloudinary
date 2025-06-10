'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import {  useToast } from '@/hooks/use-toast'
import { RainbowButton } from './magicui/rainbow-button'

export default function PaymentButton() {
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const { toast } = useToast()

  
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
              }),
            })
            
            if (verifyRes.ok) {
              toast({
                title: "Payment successful! You are now a Pro user.",   
                variant: "default",
              })
              confettiTrigger()
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
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
        <RainbowButton onClick={handlePayment}
        disabled={loading}>{loading ? "Processing..." : "Upgrade to Pro"}</RainbowButton>
    </div>
  )
}