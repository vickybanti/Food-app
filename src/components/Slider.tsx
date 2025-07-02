"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Restaurants from "./Restaurants";
import "../app/text-shadow.css";
import Categories from "./Categories";

const data = [
  {
    id: 1,
    title: "Always fresh, always crispy, always hot",
    image: "/burger.jpg",
  },
  {
    id: 2,
    title: "We deliver your order wherever you are",
    image: "/italian pizza.jpg",
  },
  {
    id: 3,
    title: "The best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const targetSectionRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToSection = () => {
    targetSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true); // Start sliding animation
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)); // Change slide
        setIsSliding(false); // Reset sliding animation
      }, 500); // Duration of sliding animation
    }, 4000); // Total interval (3.5 seconds + 0.5 seconds animation)

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="slide mr-10 flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-[#fcf6ef] transition-transform duration-500 ease-in-out my-36">
        {/* TEXT CONTAINER */}
        <div
          className={`slideText flex-1 flex items-center justify-center flex-col gap-4 font-bold transition-all duration-500 ease-in-out mx-8 ${
            isSliding ? "opacity-0 -translate-x-full" : "opacity-100 translate-x-0"
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
            onClick={handleScrollToSection}
          />
        </div>

        {/* IMAGE CONTAINER */}
        <div className="relative flex-1 w-full mx-20 overflow-hidden imgSlide">
          <div
            className={`heroSlideImg absolute w-full h-[90%] transition-transform duration-500 ease-in-out lg:mx-0 md:mx-8 sm:mx-10 ${
              isSliding ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
            }`}
          >
            <Image
              src={data[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Restaurants Component */}
      <div ref={targetSectionRef}>
        <Categories />
      </div>
    </>
  );
};

export default Slider;
