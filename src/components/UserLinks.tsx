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
            <span className=' first-letter:rounded-full p-3 text-sm'>Hi {userName}</span>
            <DropdownMenuSeparator />
            <DropdownMenuItem> <Link href="/orders" className='text-black font-bold hover:bg-[#042D29] hover:text-white hover:w-full p-2'>Orders</Link></DropdownMenuItem>
            <DropdownMenuItem>
              <span className="cursor-pointer  text-black font-bold hover:bg-[#042D29] hover:text-white p-2  hover:w-full" onClick={()=>signOut()}>Logout</span>
            </DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu><div>
           

          </div></>
      ) : (
        <Link href={"/login"} className=''>
      <div className="relative w-10 h-10 p-2 rounded-full bg-[#042D29] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-none transition-shadow">
        <Image src="/user.svg" width={30} height={30} alt="login" className="text-white items-center justify-center"/>
      </div>
      
        </Link>
      )}
      </div>
  )
}

export default UserLinks