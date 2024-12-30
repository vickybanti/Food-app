"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import {motion} from 'framer-motion'


const UserLinks = () => {
    const {data,status} = useSession()
    const userName = data?.user.name
  return (
    <div className="">
    {status === "authenticated" ? (


        <><DropdownMenu>
          <DropdownMenuTrigger>
      <div className="relative w-10 h-10 p-2 rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-none transition-shadow">
          <Image src={data?.user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt='user' fill className='rounded-full bg-[#042D29]'/>
          </div>
      

            
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <motion.div
          initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      >
            <span className=' first-letter:rounded-full p-3 text-sm'>Hi {userName}</span>
            <DropdownMenuSeparator />
            <DropdownMenuItem> <Link href="/orders" className='text-black font-bold hover:bg-[#042D29] hover:text-white hover:w-full p-2'>Orders</Link></DropdownMenuItem>
            <DropdownMenuItem>
              <span className="cursor-pointer  text-black font-bold hover:bg-[#042D29] hover:text-white p-2  hover:w-full" onClick={()=>signOut()}>Logout</span>
            </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu><div>
           

          </div></>
      ) : ( 
        <Link href={"/login"} className=''>
      <div className="relative w-12 h-12 p-3 rounded-full bg-[#042D29] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-none transition-shadow md:ml-20 sm:ml-20">
        <Image src="/user.svg" width={40} height={40} alt="login" className="text-white items-center justify-center"/>
      </div>
      
        </Link>
      )}
      </div>
  )
}

export default UserLinks