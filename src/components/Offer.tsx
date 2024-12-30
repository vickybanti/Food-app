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
    <div className="lg:flex md:flex md:overflow-x-auto justify-between lg:w-full md:w-[40%] gap-2 pt-10 mt-0">
      <div className="lg:w-[100%] md:w-[30%] rounded-lg lg:h-80 md:h-32 lg:mx-6">
    <div className="bg-black h-full flex flex-col md:gap-2  md:bg-[url('/offerBg.png')] lg:mx-5 rounded-2xl">
      {/* TEXT CONTAINER */}
      <div className="flex flex-col items-center justify-center flex-1 lg:gap-8 md:gap-3 p-6 text-center md:w-[30%] lg:w-full ">
        <h1 className="lg:text-xl md:text-sm font-bold text-white">Delicious Burger & French Fry</h1>
        <p className="text-gray-400 lg:text-md md:text-xs">
          Enjoy <span className="text-green-300">20%</span> discount on burger orders this festive period
        </p>
    <div className="md:ml-10 w-5">
        <Button
          type="button"
          title="Order Now"
          variant="btn_white"
          bg="bg-[#042D29]"
          hover={true}
          onClick={()=>router.push('/products?category=Burgers')}
          
        />

</div>
                

      </div>
      {/* IMAGE CONTAINER */}
      <div className="relative flex-col flex-1 lg:w-full md:w-[20%] md:h-full">
        
        <Image src="/offerproduct.png" alt="offer" fill className="object-contain" />

        <div className="absolute bottom-0 mb-10 md:ml-5 lg:ml-1">
          <CountDown />
       </div>
        

        
      </div>
      

      
    </div>
    
    </div>


    <div className="lg:w-[100%] md:w-[80%] rounded-lg lg:h-80 md:h-14 sm:h-14 lg:mx-6">
    <div className="h-full mx-5 rounded-2xl">
      {/* TEXT CONTAINER */}
      
      <MostOrdered />
    </div>
    </div>

    </div>


  );
};

export default Offer;
