"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import "../app/text-shadow.css"

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false); // State to control sliding

  useEffect(() => {
    const interval = setInterval(() => {
      // Delay for 2 seconds before sliding
      setTimeout(() => {
        setIsSliding(true); // Start sliding animation
        setTimeout(() => {
          setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)); // Change slide
          setIsSliding(false); // Reset sliding animation
        }, 500); // Duration of the sliding animation (500ms)
      }, 2000); // Delay of 2 seconds before sliding starts
    }, 6000); // Total interval (4 seconds + 2 seconds delay)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slide flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-[#fcf6ef] transition-transform duration-500 ease-in-out mx-35 my-36">
      {/* TEXT CONTAINER */}
      <div
        className={`flex-1 flex items-center justify-center flex-col gap-15 font-bold transition-all duration-500 ease-in-out mx-10 ${
          isSliding ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"
        }`}
      >
        <h2 className="p-4 text-center text-black uppercase md:p-10 md:text-6xl xl:text-5xl text-shadow">
  {data[currentSlide].title}
</h2>
        <Button
          type="button"
          title="Order Now"
          variant="btn_white"
          bg="bg-[#042D29]"
          hover={true}
        />
      </div>
      {/* IMAGE CONTAINER */}
      <div className="relative flex-1 w-full mx-20 overflow-hidden">
        <div
          className={`slideImg absolute w-full h-[90%] transition-transform duration-500 ease-in-out lg:mx-0 md:mx-8 ${
            isSliding ? "opacity-0 translate-x-[100%]" : "opacity-100 translate-x-0"
          } `}
        >
          <Image
            src={data[currentSlide].image}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
