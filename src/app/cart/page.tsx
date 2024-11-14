"use client"
import Button from "@/components/Button";
import DeletButton from "@/components/DeleteButton";
import { Skeleton } from "@/components/ui/skeleton";
import { userCartStore } from "@/lib/utils/store";
import { DeleteSweepSharp } from "@mui/icons-material";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const CartPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  console.log(session)

  const userEmail = session?.user?.email
console.log(userEmail)

const [loading, setLoading] = useState(false)

// useEffect(()=> {
//   userCartStore.persist.rehydrate();
// })

const handleCheckout = async() => {
  setLoading(true)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },       
      body: JSON.stringify({
        price: totalPrice,
        products, 
        status: "Not paid",
        userEmail: userEmail,
        totalAmount: totalPrice,
        intentId: "pending"
      })
    });
    const getData = await res.json()
    console.log(getData)
    setLoading(false)
    router.push(`/pay/${getData._id}`)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

const {products, totalItems, totalPrice, removeFromCart} = userCartStore()
  
  return (
    <div className="cart h-[calc(100vh-6rem)] my-40 md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="cartPro text-black shadow-[20px_20px_50px_rgba(0,0,0,0.2)] no-scrollbar rounded-md ml-20  h-1/2 pt-32 px-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40 ">
        {/* SINGLE ITEM */}
        {loading && (<Skeleton className="w-40 h-40"/>)}
        {products.length === 0 ? (<h1 className="flex items-center font-bold p-12">No items in cart</h1>)
        :
        products.map((item) => (
          <div className="flex items-center justify-between mb-4" key={item._id}>
          {item.img &&
          <Image src={item.img} alt="" width={100} height={100} className="cartImage" />
          }
          <div className="">
            <h1 className="text-xl font-bold uppercase cartTitle">{item.title} </h1>
            <span className="cartoption"> ({item.quantity}) </span>
            
            <span className="cartoption">{item.optionTitle}</span>
          </div>
          <h2 className="font-bold">${item.price}</h2>
          <span className="cursor-pointer font-[red]" onClick={()=>removeFromCart(item)}>
            <DeleteSweepSharp />
          </span>
        </div>
        ))}
        
       
       
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 bg-[#400212]-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-5 xl:px-10 2xl:text-xl 2xl:gap-6 text-[#404112]">
        <div className="flex justify-between text-[#400212]">
          <span className="">Subtotal {totalItems}</span>
          <span className="">{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" /> 
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">${totalPrice}</span>
        </div>
        {session ? (
        <Button 
        type="submit" 
        onClick={handleCheckout}
        title="Checkout"
        variant="light"
        bg="bg-[#042D29]"

        
        />
        ) : (
          <Link href="/login">
          <Button 
        type="submit" 
        
        title="Login to checkout"
        variant="light"
        bg="bg-[#25330F]"

        
        />
        </Link>
        )
      }

        
        
      </div>
    </div>
  );
};

export default CartPage;
