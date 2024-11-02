"use client"
import { StripeElementsOptions } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '@/components/CheckoutForm';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentPage = ({params}:{params:{id:string}}) => {
  const {id} = params;

  const [clientSecret, setClientSecret] = useState("")

  const [isLoading, setLoading] = useState(false)

  useEffect(()=>{
    const makeRequest = async() => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/create-intent/`,{
          method:"POST",
          body:JSON.stringify({_id:id}),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json()
        setClientSecret(data.clientSecret)
        setLoading(false)
      } catch (error) {
        console.log(error)
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
    <div className='px-64 py-20 mx-40 mt-40 mb-36 shadow-[10px_10px_20px_rgba(0,0,0,0.1)] border border-gray-200 rounded-lg'>
      {isLoading && 
      <Image src={"/loaders.gif"} alt="loader" width={100} height={100}/>}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default PaymentPage