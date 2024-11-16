"use client"
import { CartItemType, OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const OrdersPage = () => {
  const router = useRouter()

  const {data:session, status} = useSession()


  const handleUpdate = (e:React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement;
    const input = form.element[0] as HTMLInputElement
    const status = input.value
    mutation.mutate({id,status})
  }



  if(status==="unauthenticated"){
    router.push("/login")
  }


  const { isPending, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: async () =>
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`).then((res) =>
         res.json(),
      ),
  })

  console.log("Orders=",data)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async({id,status}:{id:string,status:string}) => {
      return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`,{
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(status),
      })
    },
    onSuccess(){
      queryClient.invalidateQueries({queryKey: ["orders"]});
    }
  })

  if(isPending || status ==="loading") {
    return "loading..."
  };


  return (
    <div className="cart p-32 mt-32 mb-20 lg:px-32 xl:px-40">
      {data?.length === 0 ? (
        <div className="text-2xl text-center">No orders found</div>
      ) : ( 
      <table className="cartPro w-full border-separate border-spacing-3 bg-transparent opacity-90 border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Total Amount ($)</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item:OrderType) => (
            <tr className={`text-sm md:text-base ${item.status==="delivered"? `bg-green-400`:`bg-red-50`}`} key={item._id}>
            <td className="hidden px-1 py-6 md:block">{item._id}</td>
            <td className="px-1 py-6">{item.createdAt.toString().slice(0,10)}</td>
            <td className="px-1 py-6">{item.totalAmount}</td>
            <td className="hidden px-1 py-6 md:block">{item.products.map((product:CartItemType)=>product.title).join(", ")}</td>
            
              {session?.user.isAdmin ? (
                <td className="px-1 py-6">
                  <form className="flex items-center justify-center gap-4" onSubmit={(e)=>handleUpdate(e,item._id)}>
                  <input placeholder={item.status} className="p-2 ring-red-100 row "/>
                <button className="p-2 bg-red-500 rounded-full">
                  <Image src="/edit.png" alt="" width={20} height={20} />
                </button>
                  </form>
                </td>
              ) 
              :
              (<td className="px-1 py-6">
                {item.status}
              </td>)}
               
             
          </tr>
          
          ))}
          
        </tbody>
      </table>
      )}
    </div>
  );
};

export default OrdersPage;
