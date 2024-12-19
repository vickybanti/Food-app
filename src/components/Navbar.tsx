"use client"
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";
import { NAV_LINKS } from "@/constants";
import SearchBox from "./Search";
import { Address } from "./Address";
import { NavAddress } from "./NavAddress";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScroll } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState("down")
  
  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - 170
    setScrollDirection(diff > 0 ? "down" : "up")
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 170);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDesktop = useMediaQuery("(min-width: 768px)")


  return (
    <div className={`fixed top-0 z-10 w-full bg-white ${ scrollDirection? 'backdrop-blur-lg bg-white/70 sticky' : 'bg-inherit text-black'} transition-colors duration-300 ease-in-out `}>
    <div className={`h-16 flex items-center justify-between  uppercase lg:px-5 xl:px-20 mt-5 ml-10 mr-10 `}>
        <div>
          <Link href="/">
            <div className="w-[150px] h-[90px] mt-6 px-5 font-sans text-3xl font-bold">
              <Image src="/logo-bg.png" width={60} height={40} alt="logo" className="object-contain" />
            </div>
          </Link>
        </div>
      {/* LEFT LINKS */}
      <div className="flex w-[280px] gap-4 ml-9 text-sm">

        < NavAddress />

      </div>


      <div className="gap-4 ml-[80px] w-full text-sm font-extralight flex">

      {/* {NAV_LINKS.map((link) => (
                    <Link href={link.href} key={link.key}
                    className={`regular-16 text-center flexCenter cursor-pointer
                    pb-1.5 transition-all text-gray-500 hover:font-bold ${isScrolled ? "text-black" : ""}`}>
                        {link.label}
                    </Link>
                ))}
         */}

         <SearchBox/>
        
      </div>
      {/* LOGO */}
     
      {/* MOBILE MENU */}
      <div className={`md:hidden ${isScrolled ? 'pl-2' : 'pl-0'}`}>
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="items-center justify-end flex gap-4 md:flex">
        {/* <div className="flex items-center gap-2 px-1 bg-orange-300 rounded-md cursor-pointer md:absolute top-3 r-2 lg:static">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>123 456 78</span>
        </div> */}
        <CartIcon />

        <UserLinks />
      </div>
    </div>
    </div>
  );
};

export default Navbar;
