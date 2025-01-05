"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import SearchBox from "./Search";
import { signOut, useSession } from "next-auth/react";
import { NavAddress } from "./NavAddress";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "view foods", url: "/products" },
  { id: 4, title: "cart", url: "/cart" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  const { data, status } = useSession();
  const userName =
    data?.user.name ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const userImage = data?.user.image;

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div>
      {userImage ? (
        <div className="ml-16">
          <Image
            src={open ? "/close.png" : userImage}
            alt=""
            width={30}
            height={30}
            onClick={() => setOpen(!open)}
            className="overflow-hidden rounded-full cursor-pointer"
          />
        </div>
      ) : (
        <div className="ml-16">
          <Image
            src={open ? "/close.png" : "/open.png"}
            alt=""
            width={20}
            height={20}
            onClick={() => setOpen(!open)}
            className="cursor-pointer"
          />
        </div>
      )}
      {open && (
        <div className="backdrop-blur-xl text-[#741102] fixed left-0 top-14 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-xl z-50">
          <div>
            <SearchBox />
          </div>

          <NavAddress />

          <Link
            href={status === "authenticated" ? "/orders" : "/login"}
            onClick={() => setOpen(false)}
          >
            {status === "authenticated" ? "Orders" : "Login"}
          </Link>

          <div className="ml-8">
            <CartIcon />
          </div>

          {status === "authenticated" && (
            <span
              className="cursor-pointer text-black font-bold hover:bg-[#f9cc0b] hover:text-black p-2 hover:w-full"
              onClick={() => signOut()}
            >
              Logout
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
