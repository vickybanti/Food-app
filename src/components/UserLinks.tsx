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
    <div>
    {status === "authenticated" ? (


        <><DropdownMenu>
          <DropdownMenuTrigger>
            <div className='flex items-center gap-2'>
            <Image src={data?.user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt='user' width={32} height={32} className='rounded-full'/>
            <span className='hover:bg-[#f9cc0b] hover:text-black hover:p-3 first-letter:rounded-full p-3'>Hi {userName}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem> <Link href="/orders" className='text-black font-bold hover:bg-[#f9cc0b] hover:text-black hover:w-full p-2'>Orders</Link></DropdownMenuItem>
            <DropdownMenuItem>
              <span className="cursor-pointer  text-black font-bold hover:bg-[#f9cc0b] hover:text-black p-2  hover:w-full" onClick={()=>signOut()}>Logout</span>
            </DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu><div>
           

          </div></>
      ) : (
        <Link href={"/login"}>
        <Button type='button' title="View Orders" variant='btn_white' full
        bg="bg-[#042D29]" hover={true}/>
        </Link>
      )}
      </div>
  )
}

export default UserLinks