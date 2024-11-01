"use client"
import DeletButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React, { useState } from "react";


const getData = async(id:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/${id}`,{
    cache:"no-store",

  })
  if(!res.ok){
    throw new Error("failed")
  }
  console.log(res)
  return res.json()
}

const SingleProductPage = async({params}:{params:{_id:string}}) => {

  const singleProduct:ProductType = await getData(params._id)
  console.log(singleProduct._id)

  
  return (
    <div className="relative flex flex-col justify-around h-screen p-4 text-red-500 mt-14 lg:px-20 xl:px-40 md:flex-row md:gap-8 md:items-center" key={singleProduct._id}>
      {/* IMAGE CONTAINER */}
      
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="pr-12 h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold text-black uppercase xl:text-5xl ">{singleProduct.title}</h1>
        <p className="text-gray-800">{singleProduct.desc}</p>
        <Price product={singleProduct}/>
      </div>
      <DeletButton id={singleProduct._id}/>
    </div>
  );
};

export default SingleProductPage;
