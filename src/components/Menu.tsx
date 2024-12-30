"use client";

import React, { useState } from "react";
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
  const {data,status} = useSession()
  const userName = data?.user.name || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  const userImage = data?.user.image
  
  return (
    <div>
      {/* LONG WAY */}
      {/* {!open ? (
        <Image
          src="/open.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src="/close.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )} */}
      
      {/* SHORTCUT */}


  {userImage ?
    <Image
        src={  open ? "/close.png" : userImage  }
       alt=""
        width={30}
        height={30}
        onClick={() => setOpen(!open)}
        className={`cursor-pointer rounded-full overflow-hidden m-auto`}
      />

      :

      <Image
      src={open ? "/close.png" :  "/open.png"}
      alt=""
      width={20}
      height={20}
      onClick={() => setOpen(!open)}
      className={`cursor-pointer `}
    />
}
      {open && (
        <div className="bg-white backdrop-blur-lg text-[#741102] absolute left-0 top-24 w-[80%] h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-xl z-10">
                  <SearchBox />

          

          {/* LONG WAY */}
          {/* {!user ? (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          ) : (
            <Link href="/orders" onClick={() => setOpen(false)}>
              Orders
            </Link>
          )} */}

          {/* SHORTCUT */}
          <Link
            href={userName ? "/orders" : "/login"}
            onClick={() => setOpen(false)}
          >
            {userName ? "Orders" : "Login"}
            
          </Link>
          {userName && 
          
      <span className="cursor-pointer  text-black font-bold hover:bg-[#f9cc0b] hover:text-black p-2  hover:w-full" onClick={()=>signOut()}>Logout</span>

            
}


          <Link href="#" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>

          <NavAddress />
        </div>
      )}
    </div>
  );
};

export default Menu;
