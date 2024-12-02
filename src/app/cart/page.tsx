// "use client"
// import { Address } from "@/components/Address";
// import Button from "@/components/Button";
// import DeletButton from "@/components/DeleteButton";
// import { Skeleton } from "@/components/ui/skeleton";
// import { userCartStore } from "@/lib/utils/store";
// import { DeleteSweepSharp, List } from "@mui/icons-material";
// import { Box, Divider, ListItem } from "@mui/material";
// import { signIn, useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// const CartPage = () => {
//   const { data: session } = useSession()
//   const router = useRouter()
//   console.log(session)

//   const userEmail = session?.user?.email
// console.log(userEmail)

// const [loading, setLoading] = useState(false)

// // useEffect(()=> {
// //   userCartStore.persist.rehydrate();
// // })

// const handleCheckout = async() => {
//   setLoading(true)
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },       
//       body: JSON.stringify({
//         price: totalPrice,
//         products, 
//         status: "Not paid",
//         userEmail: userEmail,
//         totalAmount: totalPrice,
//         intentId: "pending"
//       })
//     });
//     const getData = await res.json()
//     console.log(getData)
//     setLoading(false)
//     router.push(`/pay/${getData._id}`)
//   } catch (error) {    

//     console.log(error)
//     setLoading(false)
//   }
// }

// const {products, totalItems, totalPrice, removeFromCart} = userCartStore()
  





// useEffect(() => {
//   userCartStore.persist.rehydrate()
// },[])

// const [state, setState] = React.useState({
//   top: false,
//   left: false,
//   bottom: false,
//   right: false,
// });

// type Anchor = 'top' | 'left' | 'bottom' | 'right';


// const toggleDrawer =
//   (anchor: Anchor, open: boolean) =>
//   (event: React.KeyboardEvent | React.MouseEvent) => {
//     if (
//       event &&
//       event.type === 'keydown' &&
//       ((event as React.KeyboardEvent).key === 'Tab' ||
//         (event as React.KeyboardEvent).key === 'Shift')
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

// const list = (anchor: Anchor) => (
//   <Box
//     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
//     role="presentation"
//     onClick={toggleDrawer(anchor, true)}
//     onKeyDown={toggleDrawer(anchor, true)}
//   >
   
    
//   </Box>
// );
  
//   return (
//     <div>
//     <List>
            
//     {loading && (<Skeleton className="w-40 h-40"/>)}
// {products.length === 0 ? (<h1 className="flex items-center font-bold p-12">No items in cart</h1>)
// :
// products.map((item) => (
//   <ListItem className="flex items-center justify-between mb-4" key={item._id}>

//   {item.img &&
//   <Image src={item.img} alt="" width={80} height={80} className="cartImage" />
//   }
//   <div className="">
//     <h1 className="text-sm font-semibold uppercase cartTitle">{item.title} </h1>
//     <span className="cartoption text-gray-400"> {item.quantity} </span>
    
//     <span className="cartoption text-gray-400">{item.optionTitle}</span>
//   </div>
//   <h2 className="font-bold">${item.price}</h2>
//   <span className="cursor-pointer font-[red]" onClick={()=>removeFromCart(item)}>
//     <DeleteSweepSharp sx={{color:"red"}}/>
//   </span>
// </ListItem>
// ))}
//   </List>
  
//   <Divider />

//   <List>
//     <ListItem>
//       <div className="h-1/2 bg-[#400212]-50 flex flex-col gap-4 justify-between px-5 lg:h-full  2xl:w-1/2 2xl:gap-6">
//     <div className="flex justify-between gap-14">
//   <span className="">Subtotal {totalItems}</span>
//   <span className="ml-24 text-green-700">{totalPrice}</span>
// </div>
// <div className="flex justify-between">
//   <span className="">Service Cost</span>
//   <span className="text-green-700">$0.00</span>
// </div>
// <div className="flex justify-between">
//   <span className="">Delivery Cost</span>
//   <span className="text-green-500">FREE!</span>
// </div>
// <hr className="my-2" /> 
// <div className="flex justify-between">
//   <span className="">TOTAL(INCL. VAT)</span>
//   <span className="font-bold text-green-700">${totalPrice}</span>
// </div>
// {session && (
//   <Box>
  
//   <Address />
//   </Box>


// )}
// {session ? (
// <Button
// type="submit" 
// onClick={handleCheckout}
// title="Checkout"
// className="bg-[#042D29] text-white">
//   Checkout
// </Button>
// ) : (
//   <Link href="/login">
//   <Button 
// type="submit" 

// className="bg-[#042D29] text-white">
//   Login to checkout
//   </Button>
// </Link>
// )
// }
// </div>


//     </ListItem>
//   </List>
//     </div>
//   );
// };

// export default CartPage;
