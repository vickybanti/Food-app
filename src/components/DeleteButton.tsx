"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const  DeletButton= ({id}:{id:string}) => {

    const {data:session, status} = useSession()
    const router = useRouter()

    if(status ==="loading"){
        return "loading..."
    }

    if(status==="unauthenticated" || !session?.user.isAdmin){
        return;
    }

    const handleDelete = async() => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/${id}`,{
            method:"DELETE"
        })
        if(res.status === 200){
            router.push("/menu")
        } else {
            const data = await res.json()
            console.log(data.message)
        }
    }
  return (
    <button className='bg-red-5=400 p-2 rounded-full absolute t-4 r-4' onClick={handleDelete}>
        <Image src="/delete.png" alt="delete" width={20} height={20} />
    </button>
)
}

export default DeletButton