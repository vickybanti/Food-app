"use client"
import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
import Button from "./Button";
import MostOrdered from "./MostOrdered";
import { useRouter } from "next/navigation";
const Offer = () => {
  const router = useRouter()
  const dates = new Date();
  return (
    <div className="flex justify-between w-full gap-2 pt-10 mt-0">
      <div className="w-[100%] rounded-lg h-80 mx-6">
    <div className="bg-black h-full flex flex-col md:flex-row md:justify-between  md:bg-[url('/offerBg.png')] mx-5 rounded-2xl">
      {/* TEXT CONTAINER */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8 p-6 text-center md:w-full lg:w-full ">
        <h1 className="text-xl font-bold text-white">Delicious Burger & French Fry</h1>
        <p className="text-gray-400 text-md">
          Enjoy <span className="text-green-300">20%</span> discount on burger orders this festive period
        </p>

        <Button
          type="button"
          title="Order Now"
          variant="btn_white"
          bg="bg-[#042D29]"
          hover={true}
          onClick={()=>router.push('/products?category=Burgers')}
        />
                

      </div>
      {/* IMAGE CONTAINER */}
      <div className="relative flex-col flex-1 w-full md:h-full">
        
        <Image src="/offerproduct.png" alt="" fill className="object-contain" />

        <div className="absolute bottom-0 mb-10">
          <CountDown />
       </div>
        

        
      </div>
      

      
    </div>
    
    </div>


    <div className="w-[100%] rounded-lg h-80 mx-6">
    <div className="h-full mx-5 rounded-2xl">
      {/* TEXT CONTAINER */}
      
      <MostOrdered />
    </div>
    </div>

    </div>


  );
};

export default Offer;
