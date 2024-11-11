"use client"
import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
import Button from "./Button";

const Offer = () => {
  return (
    <div className="pt-32 mt-0 bg-fuchsia-50 offer">
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between  md:bg-[url('/offerBg.png')] mx-20 ">
      {/* TEXT CONTAINER */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8 p-6 text-center md:w-full lg:w-full ">
        <h1 className="text-5xl font-bold text-white xl:text-6xl">Delicious Burger & French Fry</h1>
        <p className="text-white xl:text-xl">
          Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.
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
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
    </div>
  );
};

export default Offer;
