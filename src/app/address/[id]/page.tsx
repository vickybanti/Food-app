"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Address = ({params}:{params:{id:string}}) => {
    const {id} = params

    type Inputs = {
        street: string;
        city: string;
        country: string;
        phoneNumber: string;
    }

    const router = useRouter()
    
    const [isLoading, setLoading] = useState(false)
    const [inputs, setInputs] = useState<Inputs>({
        street: "",
        city: "",
        country: "",
        phoneNumber: "",
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/address`, {
                method: "POST",
                body: JSON.stringify({...inputs, orderId:id}),
                headers: {
                    'Content-Type': 'application/json',
                },
            })   
            const data = await res.json()
            console.log(data)

            if (data) {
                const updateRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`, {
                    method: "PUT",
                    body: JSON.stringify({ address: inputs }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const updateData = await updateRes.json();
                console.log("Order updated:", updateData);

                setLoading(false)
                router.push(`/pay/${data._id}`)
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    } 

    return (
        <div className="p-32 m-20 ">
            <form className='flex flex-wrap gap-4 p-8 shadow-lg' onSubmit={handleSubmit} >
                <h1>Add new category</h1>
                <div className='flex flex-col w-full gap-2'>
                    <label>Street</label>
                    <input onChange={handleChange} type="text" name="street" className='p-2 rounded-sm ring-1 ring-red-200'/>
                </div>

                <div className='flex flex-col w-full gap-2'>
                    <label>City</label>
                    <input onChange={handleChange} name="city" className='p-2 rounded-sm ring-1 ring-red-200' type="text"/>
                </div>
                
                <div className='flex flex-col w-full gap-2'>
                    <label>Country</label>
                    <input onChange={handleChange} name="country" className='p-2 rounded-sm ring-1 ring-red-200' type="text"/>
                </div>

                <div className='flex flex-col w-full gap-2'>
                    <label>Phone number</label>
                    <input onChange={handleChange} name="phoneNumber" className='p-2 rounded-sm ring-1 ring-red-200' type="text"/>
                </div>

                <button 
                    disabled={isLoading}
                    className='p-2 w-full bg-[#404212] text-white flex items-center justify-center gap-2' type='submit'>
                    {isLoading ? "" : "Add Category"} 
                    {isLoading && (
                        <Image 
                            src="/temporary/p2.png" 
                            alt="loading" 
                            width={50} 
                            height={50}
                            className='animate-spin bg-blend-multiply'
                        />
                    )}
                </button>
            </form>
        </div>
    )
}

export default Address