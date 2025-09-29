"use client"
import { useEffect } from "react";

export default function BuyCourseContent() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePay = async () => {
    const res = await fetch("http://localhost:8080/create-order", {
      method: "POST",
    });
    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "Test Store",
      description: "Razorpay Test",
      image: "/logo.png",
      order_id: data.id,
      handler: function (response) {
        alert("Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#6366f1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="border-2 border-gray bg-gray-600 text-white">
        Buy that Swift ui course
        <button
        onClick={handlePay}
        className="px-6 py-3 bg-violet-600 text-white rounded hover:bg-indigo-700"
      >
        Pay ₹100
      </button>
      </div>
    </main>
  );
}
