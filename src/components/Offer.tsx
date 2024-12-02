"use client"
import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
import Button from "./Button";
import MostOrdered from "./MostOrdered";

const Offer = () => {
  return (
    <div className="w-full mt-0 flex justify-between gap-2 pt-10">
      <div className="w-[100%] rounded-lg h-80 mx-6">
    <div className="bg-black h-full flex flex-col md:flex-row md:justify-between  md:bg-[url('/offerBg.png')] mx-5 rounded-2xl">
      {/* TEXT CONTAINER */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8 p-6 text-center md:w-full lg:w-full ">
        <h1 className="text-xl font-bold text-white">Delicious Burger & French Fry</h1>
        <p className="text-white text-lg">
          Enjoy every bite of special burgers
        </p>
        {/* <CountDown/> */}

        <Button
          type="button"
          title="Order Now"
          variant="btn_white"
          bg="bg-[#042D29]"
          hover={true}
        />
      </div>
      {/* IMAGE CONTAINER */}
      <div className="relative flex-1 w-full md:h-full">
        <Image src="/offerproduct.png" alt="" fill className="object-contain" />
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
