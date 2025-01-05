import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import SearchBox from "./Search";
import { signOut, useSession } from "next-auth/react";
import { NavAddress } from "./NavAddress";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { data, status } = useSession();
  const userImage = data?.user.image || "/open.png";

  return (
    <div>
      {/* Toggle Menu Icon */}
      <div className="ml-16">
        <Image
          src={open ? "/close.png" : userImage}
          alt="Toggle Menu"
          width={30}
          height={30}
          onClick={() => setOpen(!open)}
          className="overflow-hidden rounded-full cursor-pointer"
        />
      </div>

      {/* Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 backdrop-blur-xl text-[#741102] flex flex-col gap-8 items-center justify-center text-xl">
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
