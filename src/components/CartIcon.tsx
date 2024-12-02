"use client"
import { ShoppingCartRounded } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
   import Box from '@mui/material/Box';
    import SwipeableDrawer from '@mui/material/SwipeableDrawer';
    import Button from '@mui/material/Button';
    import List from '@mui/material/List';
    import Divider from '@mui/material/Divider';
    import ListItem from '@mui/material/ListItem';
    import ListItemButton from '@mui/material/ListItemButton';
    import ListItemIcon from '@mui/material/ListItemIcon';
    import ListItemText from '@mui/material/ListItemText';
    import InboxIcon from '@mui/icons-material/MoveToInbox';
    import MailIcon from '@mui/icons-material/Mail';
    import { Address } from "./Address";
    import DeletButton from "./DeleteButton";
    import { Skeleton } from "./ui/skeleton";
    import { userCartStore } from "@/lib/utils/store";
    import { DeleteSweepSharp } from "@mui/icons-material";
    import { signIn, useSession } from "next-auth/react";
    import { useRouter } from "next/navigation";
    
    type Anchor = 'top' | 'left' | 'bottom' | 'right';
    
    export default function CartIcon() {

     
        const { data: session } = useSession()
        const router = useRouter()
        console.log(session)
      
        const userEmail = session?.user?.email
      console.log(userEmail)
      
      const [loading, setLoading] = useState(false)
      
      // useEffect(()=> {
      //   userCartStore.persist.rehydrate();
      // })
      
      const handleCheckout = async() => {
        setLoading(true)
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },       
            body: JSON.stringify({
              price: totalPrice,
              products, 
              status: "Not paid",
              userEmail: userEmail,
              totalAmount: totalPrice,
              intentId: "pending"
            })
          });
          const getData = await res.json()
          console.log(getData)
          setLoading(false)
          router.push(`/pay/${getData._id}`)
        } catch (error) {    
      
          console.log(error)
          setLoading(false)
        }
      }
      
      const {products, totalItems, totalPrice, removeFromCart} = userCartStore()
        





      useEffect(() => {
        userCartStore.persist.rehydrate()
      },[])

      const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
          if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
              (event as React.KeyboardEvent).key === 'Shift')
          ) {
            return;
          }
    
          setState({ ...state, [anchor]: open });
        };
    
      const list = (anchor: Anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
          role="presentation"
          onClick={toggleDrawer(anchor, true)}
          onKeyDown={toggleDrawer(anchor, true)}
        >
          <List>
            
            {loading && (<Skeleton className="w-40 h-40"/>)}
        {products.length === 0 ? (<h1 className="flex items-center font-bold p-12">No items in cart</h1>)
        :
        products.map((item) => (
          <ListItem className="flex items-center justify-between mb-4" key={item._id}>

          {item.img &&
          <Image src={item.img} alt="" width={80} height={80} className="cartImage" />
          }
          <div className="">
            <h1 className="text-sm font-semibold uppercase cartTitle">{item.title} </h1>
            <span className="cartoption text-gray-400"> {item.quantity} </span>
            
            <span className="cartoption text-gray-400">{item.optionTitle}</span>
          </div>
          <h2 className="font-bold">${item.price}</h2>
          <span className="cursor-pointer font-[red]" onClick={()=>removeFromCart(item)}>
            <DeleteSweepSharp sx={{color:"red"}}/>
          </span>
        </ListItem>
        ))}
          </List>
          
          <Divider />

          <List>
            <ListItem>
              <div className="h-1/2 bg-[#400212]-50 flex flex-col gap-4 justify-between px-5 lg:h-full  2xl:w-1/2 2xl:gap-6">
            <div className="flex justify-between gap-14">
          <span className="">Subtotal {totalItems}</span>
          <span className="ml-24 text-green-700">{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="text-green-700">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" /> 
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold text-green-700">${totalPrice}</span>
        </div>
        {session && (
          <Box
          onClick={()=>!toggleDrawer(anchor, true)}
          onKeyDown={()=>!toggleDrawer(anchor, true)}
          >
          
          <Address />
          </Box>

        
        )}
        {session ? (
        <Button
        type="submit" 
        onClick={handleCheckout}
        title="Checkout"
        className="bg-[#042D29] text-white">
          Checkout
        </Button>
        ) : (
          <Link href="/login">
          <Button 
        type="submit" 
        
        className="bg-[#042D29] text-white">
          Login to checkout
          </Button>
        </Link>
        )
      }
</div>
        
        
            </ListItem>
          </List>
          
        </Box>
      );
    
      return (
        <div>
          {(['right'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>

                <div className="relative flex w-8 h-8 p-5 items-center justify-center rounded-full bg-[#042D29] mr-10 md:w-5 md:h-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-none">
                  <ShoppingCartCheckoutOutlinedIcon className="text-white font-light"/>
                  {totalItems > 0 && (<span className="text-white">{totalItems}</span>)}
                </div>
                
                </Button>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
                sx={{width:"80%"}}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </div>
      );
    }

    
      
 

