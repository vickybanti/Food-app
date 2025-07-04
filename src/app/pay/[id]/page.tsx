"use client"
import { StripeElementsOptions } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '@/components/CheckoutForm';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentPage = ({params}:{params:{id:string}}) => {
  const {id} = params;
  console.log(id)

  const [clientSecret, setClientSecret] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    const makeRequest = async() => {
      if (!id) {
        setError("Order ID is missing")
        redirect("/")
      }

      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/create-intent/`,{
          method:"POST",
          body:JSON.stringify({orderId:id}),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          const errorMessage = errorData?.message || `Failed to create payment intent (Status: ${res.status})`;
          console.error('Payment intent creation failed:', {
            status: res.status,
            errorData,
            orderId: id
          });
          throw new Error(errorMessage);
        }

        const data = await res.json()
        if (!data.clientSecret) {
          throw new Error('No client secret received from the server');
        }
        setClientSecret(data.clientSecret)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        setError(errorMessage);
        console.error('Payment setup error:', {
          error,
          orderId: id,
          url: `${process.env.NEXT_PUBLIC_URL}/api/create-intent/`
        });
      } finally {
        setLoading(false)
      }
    }
    makeRequest()
  },[id])

  const options:StripeElementsOptions={
    clientSecret,
    appearance:{
      "theme":"stripe"
    }
  }
  return (
    <div className='checkoutPage px-64 py-20 mx-40 mt-40 mb-36 shadow-[10px_10px_20px_rgba(0,0,0,0.1)] border border-gray-200 rounded-lg'>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {isLoading && 
        <Image src={"/loaders.gif"} alt="loader" width={100} height={100}/>
      }
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default PaymentPage