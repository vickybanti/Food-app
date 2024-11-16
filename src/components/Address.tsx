import React, { useEffect } from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useSession } from "next-auth/react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  




export function Address() {

    type usersInput = {

        street: string | null | undefined;
        city: string | null | undefined;
        country: string | null | undefined;
        phoneNumber: string | null | undefined;
        userEmail:string | null | undefined;
    }
    const [users, setUser] = useState<usersInput>({
        street: "",
        city: "",
        country: "",
        phoneNumber: "",
        userEmail: "",
    })
    const {data:session} = useSession()
    const email = session?.user?.email
    console.log("email=",email)

    const userId = session?.user?.id;

    useEffect(()=>{
        const fetchAddress = async() => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    },
                })
            
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const getUser = await res.json()
                console.log("Fetched user data:", getUser)
                const getUserEmail = getUser.map((user: { email: string }, index: number) => user.email)

                if(getUserEmail.includes(email)){
                    const id = getUser.find((user: { email: string | null | undefined }) => user.email === email)._id
                    const addressRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/address/${id}`, {
                        method: "GET"
                    })
                    const addressData = await addressRes.json()
                    console.log("Fetched address data:", addressData)
                    setUser(addressData)

                }

    
    
            } catch (error) {
                console.error("Error fetching address:", error)
            }

    
    }
    fetchAddress()

},[email])

console.log("users",users)

    
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Use Current Delivery Address</AccordionTrigger>
    <AccordionContent className="px-3 flex flex-col">
    {users.street && <span className="px-2">{users.street}</span>}
        {users.city && <span className="px-2">{users?.city}</span>}
        {users.country && <span className="px-2">{users?.country}</span>}
        
        {users.phoneNumber && <span className="px-2">Phone number: {users?.phoneNumber}</span>}
        {!users.city || !users.street || !users.country || !users.phoneNumber && 
        
        <p className="text-black font-bold">No Address found...</p>}
    </AccordionContent>
  </AccordionItem>
</Accordion>



       



        <DialogTrigger asChild>
         <Button variant="outline">or Enter New address</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter new address</DialogTitle>
            <DialogDescription>
                Enter a new delivery address
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div>
        


    
    <Drawer open={open} onOpenChange={setOpen}>


    <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Use Current Delivery Address</AccordionTrigger>
    <AccordionContent className="px-3 flex flex-col">
    {users.street && <span className="px-2">{users.street}</span>}
        {users.city && <span className="px-2">{users?.city}</span>}
        {users.country && <span className="px-2">{users?.country}</span>}
        
        {users.phoneNumber && <span className="px-2">Phone number: {users?.phoneNumber}</span>}
        {!users.city || !users.street || !users.country || !users.phoneNumber && 
        
        <p className="text-black font-bold">No Address found...</p>}
    </AccordionContent>
  </AccordionItem>
</Accordion>


      <DrawerTrigger asChild>
        <Button variant="outline">Add Address</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Enter delivery address</DrawerTitle>
          <DrawerDescription>
           Enter a new delivery address here
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    </div>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form"> ) {
    
    
    type Inputs = {

        street: string;
        city: string;
        country: string;
        phoneNumber: string;
        userEmail:string;
    }

    const {data:session} = useSession()
    const email = session?.user?.email
    console.log("email=",email)
    
    const [isLoading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    const [inputs, setInputs] = useState<Inputs>({
        street: "",
        city: "",
        country: "",
        phoneNumber: "",
        userEmail: email || ""
    })

    console.log("User ID:", email);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage(false)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
                method: "PUT",
                body: JSON.stringify({body:inputs}),
                headers: {
                    'Content-Type': 'application/json',
                },
            })   
            const data = await res.json()
            setLoading(false)
            setMessage(true)
            console.log(data)

            // if (data) {
            //     const updateRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/`, {
            //         method: "PUT",
            //         body: JSON.stringify(inputs),
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //     });

            //     const updateData = await updateRes.json();
            //     console.log("User updated:", updateData);

            //     setLoading(false)
            // }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    } 
  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="street">Street</Label>
        <Input type="text" id="street" name="street" 
        onChange={(e) => handleChange(e)}
        defaultValue="" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" name="city" onChange={(e) => handleChange(e)}
        defaultValue="" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <Input id="country" name="country" onChange={(e) => handleChange(e)}
        defaultValue="" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phoneNumber">Phone number</Label>
        <Input id="phoneNumber" name="phoneNumber" onChange={(e) => handleChange(e)}
        defaultValue="" />
      </div>
      <Button type="submit" disabled={isLoading}>{message ?"Saved":"Save changes"}</Button>
    </form>
  )
}

// async function fetchUserDetails(email) {
//     try {
//         const response = await fetch('/api/getUserDetails', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email }),
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const userDetails = await response.json();
//         console.log(userDetails);
//         // Handle user details (e.g., update state or display them)
//     } catch (error) {
//         console.error('Error fetching user details:', error);
//     }
// }

// // Example usage
// fetchUserDetails('user@example.com');
