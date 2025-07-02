"use client";
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";
import { NAV_LINKS } from "@/constants";
import SearchBox from "./Search";
import { NavAddress } from "./NavAddress";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScroll } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("down");

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - 170;
    setScrollDirection(diff > 0 ? "down" : "up");
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 170);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div
      className={`fixed top-0 z-10 w-full bg-white ${
        isDesktop && isScrolled ? "backdrop-blur-lg bg-white/70" : "bg-inherit"
      } transition-colors duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between h-16 lg:mx-10 xl:mx-10 lg:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <div className="w-[150px] lg:h-[90px] md:h-[45px] md:ml-12 sm:ml-12 px-2 font-sans text-3xl font-bold md:py-3">
              <Image
                src="/logo-bg.png"
                width={60}
                height={40}
                alt="logo"
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        {!isDesktop && (
          <div className={`md:hidden`}>
            <Menu />
          </div>
        )}

        {/* Desktop Navigation Links */}
        {isDesktop && (
          <div className="flex items-center gap-6">
            <NavAddress />
            <div className="flex gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className={`regular-16 text-center cursor-pointer pb-1.5 transition-all text-gray-500 hover:font-bold ${
                    isScrolled ? "text-black" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Box */}
        {isDesktop ? (
          <div className="ml-4">
            <SearchBox />
          </div>
        ) : null}

        {/* Right-Side Links */}
        <div className="flex items-center gap-4">
          {isDesktop ? (
            <>
              <CartIcon />
              <UserLinks />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
