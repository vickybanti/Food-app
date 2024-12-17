"use client";

import { toast } from "@/hooks/use-toast";
import { ProductType } from "@/types/types";
import { userCartStore } from "@/lib/utils/store";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import { motion } from "framer-motion";



const Price = ({ product }: {product:ProductType}) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState(false)

  const {addToCart} = userCartStore()
//to prevent hydration i.e trying to persist the cart to use client rendering on a server rendering
  useEffect(() => {
    userCartStore.persist.rehydrate()
  },[])

  useEffect(() => {
    if(product.options?.length){
      
        setTotal(
          quantity * (Number(product.price) + Number(product.options[selected].additionalPrice))
        );
      }
      
    
    
  }, [quantity, selected, product]);

  const handleCart = () => {
    addToCart({
      _id:product._id,
      title:product.title,
      price:total,
      img:product.img,
      ...(product.options?.length && {
        optionTitle:product.options[selected].title
    }),
      quantity:quantity


    })

    setMessage(true)
   

  }

  return (
    <>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
    <div className="flex justify-between w-full">
      <div className="relative mr-16 h-44 w-60">
      <Image 
        src={product.img || ''}
        alt=""
        fill
        className="object-contain"
      
      />

      </div>
     

     <div className="flex flex-col justify-between gap-4">
      <h2 className="text-2xl text-[#741102] font-normal">${total}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length  && product.options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 ring-1 ring-gray-100 rounded-md"
            style={{
              background: selected === index ? "grey" : "white",
              color: selected === index ? "white" : "grey",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex items-center justify-between">
        {/* QUANTITY */}
        <div className="flex justify-between w-full mr-10 ring-[#f0f0f0]">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            className="flex items-center justify-center text-white bg-black rounded-md w-11 h-11"
            >
              {"-"}
            </button>
            <span className="text-[#741102]">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            className="flex items-center justify-center text-white bg-black rounded-md w-11 h-11"
            >
              {"+"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <Button type='button' 
        title={ message ? `Added to cart`:`Add to cart`} 
        variant='btn_white' 
        full
        bg="bg-[#042D29]"
        onClick={()=>handleCart()} 
        hover={true}/>
      
        
      </div>
    </div>
    </div>
    </motion.div>
    </>
  );
};

export default Price;
