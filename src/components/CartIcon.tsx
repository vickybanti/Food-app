"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowBackIos,
  ShoppingCartCheckoutOutlined as CheckoutIcon,
  DeleteSweepSharp,
} from "@mui/icons-material";
import {
  Box,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { userCartStore } from "@/lib/utils/store";
import { Skeleton } from "./ui/skeleton";
import { Address } from "./Address";


type Anchor = "top" | "left" | "bottom" | "right";

export default function CartIcon() {
  const { data: session } = useSession();
  const router = useRouter();

  const userEmail = session?.user?.email;

  const [loading, setLoading] = useState(false);
  const { products, totalItems, totalPrice, removeFromCart } = userCartStore();

  useEffect(() => {
    userCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: totalPrice,
          products,
          status: "Not paid",
          userEmail: userEmail,
          totalAmount: totalPrice,
          intentId: "pending",
        }),
      });
      const getData = await res.json();
      setLoading(false);
      router.push(`/pay/${getData._id}`);
    } catch (error) {
      console.error("Checkout Error:", error);
      setLoading(false);
    }
  };

  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const DrawerList = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div onClick={toggleDrawer(anchor, false)} className="cursor-pointer">
          <ArrowBackIos sx={{ marginLeft: "10px" }} />
        </div>
        {loading && <Skeleton className="w-40 h-40" />}
        {products.length === 0 ? (
          <h1 className="flex items-center p-12 font-thin">No items in cart</h1>
        ) : (
          products.map((item) => (
            <ListItem key={item._id} className="flex items-center justify-between mb-4">
              {item.img && <Image src={item.img} alt="" width={80} height={80} className="cartsImage" />}
              <div className="ml-8">
                <h1 className="text-sm font-thin uppercase cartsFont">{item.title}</h1>
                <span className="font-thin text-gray-400">{item.quantity}</span>
                <span className="font-thin text-gray-400">{item.optionTitle}</span>
              </div>
              <h2 className="ml-8 font-bold">${item.price}</h2>
              <span
                className="ml-3 cursor-pointer"
                onClick={() => removeFromCart(item)}
              >
                <DeleteSweepSharp sx={{ color: "red" }} />
              </span>
            </ListItem>
          ))
        )}
      </List>
      <Divider />
      <List>
        <ListItem>
          <div className="flex flex-col gap-4 px-5">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems})</span>
              <span className="text-green-700">${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Cost</span>
              <span className="text-green-700">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Cost</span>
              <span className="text-green-500">FREE!</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <span>TOTAL (INCL. VAT)</span>
              <span className="font-bold text-green-700">${totalPrice}</span>
            </div>
            {session && <Address />}
            {session ? (
              <Button
                onClick={handleCheckout}
                disabled={totalItems <= 0}
                className="px-4 py-2 text-white bg-teal-700 rounded hover:bg-teal-600 disabled:opacity-50"
              >
                Checkout
              </Button>
            ) : (
              <Link href={totalItems > 0 ? "/login" : "#"}>
                <Button
                  disabled={totalItems <= 0}
                  className="px-4 py-2 bg-teal-700 rounded hover:bg-teal-600 hover:text-white disabled:opacity-50"
                >
                  {totalPrice > 0 ? "Login to Checkout" : "Add at least one product"}
                </Button>
              </Link>
            )}
          </div>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="bg-none drop-shadow-none">
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} className="shadow-none">
            <div className="relative flex items-center justify-center p-3 bg-[#042D29] rounded-full shadow-md hover:shadow-none">
              <CheckoutIcon className="text-white" />
              {totalItems > 0 && <span className="absolute ml-8 text-xs text-white">{totalItems}</span>}
            </div>
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={drawerState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {DrawerList(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
