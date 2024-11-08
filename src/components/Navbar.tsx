"use client"
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";
import { NAV_LINKS } from "@/constants";
import SearchBox from "./Search";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 570);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 z-10 w-full bg-fuchsia-50">
    <div className={`h-1 p-4 flex items-center justify-between  uppercase md:h-24 lg:px-5 xl:px-20 ${isScrolled ? 'bg-gray-70 backdrop-blur-sm border-b-[#741102]  rounded-3xl border-b-2' : 'bg-inherit text-black'} transition-colors duration-300 ease-in-out mt-5 ml-10 mr-10 `}>
      <div className="px-5 font-sans text-3xl font-bold">
        <Link href="/">
          <Image src="/logo-bg.png" width={100} height={80} alt="logo"/>
        </Link>
        </div>
      {/* LEFT LINKS */}
      <div className="flex-1 hidden gap-4 pl-40 ml-20 md:flex">
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
      <div className="md:hidden">
        <SearchBox />
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="items-center justify-end flex-1 hidden gap-4 md:flex">
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
