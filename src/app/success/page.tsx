"use client";
import { userCartStore } from '@/lib/utils/store';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Success = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();

  const { clearCart } = userCartStore();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        if (payment_intent) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/confirm/`, {
            method: "PUT",
            body: JSON.stringify({ intentId: payment_intent }), // Send as an object
            headers: { 'Content-Type': 'application/json' },
          });

          // Check response status
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error confirming order:", errorData);
            return; // Exit if there was an error
          }

          await response.json(); // Handle response if needed
          router.push("/orders");
        } else {
          console.error("Payment intent is missing");
        }
      } catch (error) {
        console.log("Request failed:", error);
      }
    };

    makeRequest();
  }, [payment_intent, router]); // Add dependencies for useEffect

  return (
    <div className='px-64 py-20 mx-40 mt-40 mb-36 shadow-[10px_10px_20px_rgba(0,0,0,0.1)] border border-gray-200 rounded-lg'>
      Success
    </div>
  );
}

export default Success;
