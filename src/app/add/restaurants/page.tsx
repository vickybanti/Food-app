"use client"
import {Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Schema } from '@mui/icons-material';
import mongoose from 'mongoose';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
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



type Inputs = {
    _id:string;
    name:string;
    lowestPrice:number;
    highestPrice:number;
    isFeatured:boolean;
    location:string;
    opened:boolean;
    openTime:string;
    closingTime:string;
}
type Product = {
  title:string;
  desc:string;
  price:number;
  catSlug:string;
  isFeatured:boolean;

}
type Category = {
  _id:string;
  title:string;
  slug:string;
}

type Option = {
  _id:string;
  title:string;
  additionalPrice:number;
}




const Page = () => {

    const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [resId, setResId] = useState("")
 
    const router = useRouter()
    const {data:session, status} =  useSession()
    const [file, setFile] = useState<File>()
    const [isLoading, setLoading] = useState(false)
    const [inputs, setInputs] = useState<Inputs>({
        _id:"",
        name: "",
        lowestPrice: 0,
        highestPrice: 0,
        isFeatured: false,
        location:"",
        opened:true,
        openTime:"",
        closingTime:""
    })

 



    

    const [success, setSuccess] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setInputs(prev => {
            const value = e.target.name === "price" ? Number(e.target.value) : e.target.value;
            return {...prev, [e.target.name]: value}
        })
    }

       

    const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const item = (target.files as FileList)[0]
        setFile(item)
    }

    
  

  const upload = async () => {
      const data = new FormData()
      data.append("file", file!)
      data.append("upload_preset","restaurant")
      const res = await fetch(`https://api.cloudinary.com/v1_1/du3vn9rkg/image/upload`, {
          method: "POST",
          body: data,
          
        });

      const resData = await res.json();
      console.log(resData)
      return resData.url;
  }

  


 

     
   


    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!inputs.name.trim()) {
           setMessage("product title is required");
            return;
        }
        
       
        if (!inputs.lowestPrice) {
          setMessage("product description is required");
          return;
        }
        if (inputs.lowestPrice < 0 ) {
          setMessage("product title characters must be greater than zero");
          return;
        }

        if (inputs.highestPrice < 0 ) {
          setMessage("product description characters must be greater than zero");
          return;
        }
       
       
       
      
      //  if (!products.desc) {
      //    setMessage("product description is required");
      //    return;
      //  }
      //  if (products.price < 1 ) {
      //    setMessage("product price characters must be greater than zero");
      //    return;
      //  }
      //  if (!products.catSlug ) {
      //      setMessage("please input a category");
      //      return;
      //    }
 
       
      
       
       if (!file) {
           setMessage("Please upload an image");
           return;
       }
 

        setLoading(true)
        try {
            const url = await upload()

            const restaurantData = {
            
                img: url,
                name: inputs.name.trim(),
                lowestPrice: Number(inputs.lowestPrice),
                highestPrice: Number(inputs.highestPrice),
                location:inputs.location,
                opened:inputs.opened,
                openTime:inputs.openTime,
                closingTime:inputs.closingTime               
                
            }
           
             
            

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/restaurants`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ restaurantData:restaurantData})
            })   

            const data = await res.json()

            setResId(data._id)
            console.log(data)
            console.log("resId=",data._id)
            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong')
            }
            
            setSuccess(true)
        } catch (error) {
            console.error(error)
            alert(error instanceof Error ? error.message : "Error submitting product")
        } finally {
            setLoading(false)
        }
    }

    const [products, setProducts] = useState<Product>({
  
      title:"",
      desc:"",
      catSlug:"",
      price:0,
      isFeatured:false
      
    })
    const [productFile, setProductFile] = useState<File>()
    
    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setProducts(prev => {
          const value = e.target.name === "price" ? Number(e.target.value) : e.target.value;
          return {...prev, [e.target.name]: value}
      })
    }
    const handleProductImage = (e:React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement
      const item = (target.files as FileList)[0]
      setProductFile(item)
  }
  

  const uploadProductImage = async () => {
      const data = new FormData()
      data.append("file", productFile!)
      data.append("upload_preset","restaurant")
      const res = await fetch(`https://api.cloudinary.com/v1_1/du3vn9rkg/image/upload`, {
          method: "POST",
          body: data,
          
        });

      const resData = await res.json();
      console.log(resData)
      return resData.url;
  }

 



const [allCat, setCat] = useState<Category[]>([])

useEffect(() => {
    const getCat = async() => {
        const cats = await fetch(`/api/categories`)
        const data = await cats.json()
        setCat(data)
    }
    getCat()
},[])








const [option, setOption] = useState<Option>({
    _id:"",
    title: "",
    additionalPrice:0

})
const changeOptions =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          
  setOption(prev => {
      const value = e.target.name === "additionalPrice" ? Number(e.target.value) : e.target.value;
      return {...prev, [e.target.name]: value}
  })

}


const [options, setOptions] = useState<Option[]>([])
const [allProduct, setAllProduct] = useState<Product[]>([])
const [message, setMessage] = useState("")

console.log("products=",products)
console.log("allProduct=", allProduct)




    

    const handleProductSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!products.title.trim()) {
            setMessage("product title is required");
            return;
        } 

        setLoading(true);
        setMessage("")
        try {
            const proUrl = await uploadProductImage();
            const productData = allProduct.map((pro) => {
                return {
                    img: proUrl,
                    title: pro.title.trim(),
                    desc: pro.desc.trim(),
                    catSlug: pro.catSlug.trim(),
                    price: Number(pro.price),
                    isFeatured: pro.isFeatured,
                    restaurantId: resId,
                    options: options.map(opt => ({
                        _id: opt._id,
                        title: opt.title.trim(),
                        additionalPrice: Number(opt.additionalPrice)
                    }))
                };
            });

            // Add product to restaurant database
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/restaurants/${resId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productData: productData })
            });

            const data = await res.json();
            console.log(data);

            // Add product to products database
           
            if (res) {
                
              
            setLoading(false);
            setMessage("Restaurant added successfully");
            router.push(`/restaurants/${resId}`);
            }
        } catch (error) {
            console.error(error);
            setMessage(error instanceof Error ? error.message : "Error submitting product");
        } finally {
            setLoading(false);
        }
    }
  return (
    <div className="p-32 mx-10 loginForm">
      <form className='flex flex-wrap gap-4 p-8 shadow-lg w-[75%] m-auto bg-white' onSubmit={handleSubmit}>
        <h1>Add new Restaurant</h1>
        <div className='flex flex-col w-full gap-2'>
          <Label>Restaurant name</Label>
          <Input onChange={handleChange} type="text" name="name" disabled={resId ? true : false} className='p-2 rounded-sm ring-1 ring-black-200'/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>Image</Label>
          <Input onChange={handleChangeImage} type="file" className='p-2 rounded-sm ring-1 ring-black-200' disabled={resId ? true : false}/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>LowestPrice</Label>
          <Input onChange={handleChange} name="lowestPrice" className='p-2 rounded-sm ring-1 ring-black-200' disabled={resId ? true : false}/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>Highest Price</Label>
          <Input onChange={handleChange} type="number" name="highestPrice" className='p-2 rounded-sm ring-1 ring-black-200' disabled={resId ? true : false}/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>Location</Label>
          <Input onChange={handleChange} type="text" name="location" className='p-2 rounded-sm ring-1 ring-black-200' disabled={resId ? true : false}/>
        </div>
        <div className='flex flex-col w-full gap-2'>
            <Label>Opened</Label>
            <select onChange={handleChange} name="opened" className='p-2 rounded-sm ring-1 ring-black-200'>
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <Label>Opening time</Label>
          <Input onChange={handleChange} type="text" name="openTime" className='p-2 rounded-sm ring-1 ring-black-200' disabled={resId ? true : false}/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>Closing time</Label>
          <Input onChange={handleChange} type="text" name="closingTime" className='p-2 rounded-sm ring-1 ring-black-200' disabled={resId ? true : false}/>
        </div>



        <Button className='flex items-center justify-center w-full gap-2 p-2 text-white' type='submit' disabled={isLoading || resId ? true : false}>
           {isLoading? `Adding...`:
            `Add Restaurant`
            
          }

        </Button>

      </form>
        <hr />
        {success && <span className='px-8 text-green-600'>Restaurant added successfully</span>}
        
        {resId && (
          <form className='flex flex-wrap gap-4 p-8 shadow-lg w-[75%] m-auto bg-white' onSubmit={handleProductSubmit}>
        <span className='text-gray-600 tetx-sm'>Add atleast one product</span>

        <div className='flex flex-col w-full gap-2'>
          <Label>Product title</Label>
          <Input onChange={handleProductChange} className='w-full p-2 rounded-sm ring-black-200' type="text" name="title" placeholder='Title' />

          
        </div>


        <div className='flex flex-col w-full gap-2'>
          <Label>Image</Label>
          <Input onChange={handleProductImage} type="file" className='p-2 rounded-sm ring-1 ring-black-200'/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>Product Description</Label>
          <textarea onChange={handleProductChange} className='w-full p-2 rounded-sm ring-black-200'  name="desc" placeholder='Description' />

          
        </div>
        <div className='flex flex-col w-full gap-2'>
          <Label>Product price</Label>
          <Input onChange={handleProductChange} className='w-full p-2 rounded-sm ring-black-200' type="number" name="price" placeholder='price' />

          
        </div>


        <div className='flex flex-col w-full gap-2'>
          <Label>Category</Label>
          <select onChange={handleProductChange} name="catSlug" className='p-2 rounded-sm ring-1 ring-black-200'>
            <option value="">Select a category</option>
            {allCat.map((item: Category) => (
              <option value={item.slug} key={item._id}>{item.title}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col w-full gap-2'>
            <Label>Featured</Label>
            <select onChange={handleProductChange} name="isFeatured" className='p-2 rounded-sm ring-1 ring-black-200'>
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>
        </div>


        <div className='flex flex-col w-full gap-2'>
          <Label>Options</Label>
          <div className='flex gap-6'>
            <Input onChange={changeOptions} className='p-2 rounded-sm w-36' type="text" name="title" placeholder='Title' />
            <Input onChange={changeOptions} className='p-2 rounded-sm w-36' type="number" name="additionalPrice" placeholder='Additional Price' />
          </div>
          <Button
            type="button"
            className='p-2 text-white bg-slate-900 w-52'
            onClick={() => setOptions((prev) => [...prev, option])}
          >
            Add Options
          </Button>

          <div className='flex flex-col w-full gap-2'>
          {options.map((item) => (
            <div className='p-2 rounded-md cursor-pointer ring-1 ring-black-200' key={item.title} onClick={() => setOptions(options.filter(opt=>opt.title !== item.title))}>
              <span>{item.title}</span>
              <span>${item.additionalPrice}</span>
            </div>
          ))}

        </div>


          <Button
            type="button"
            className='p-2 text-white bg-slate-900 w-52'
            onClick={() => setAllProduct((prev) => [...prev, products])}
          >
            Add product
          </Button>


        </div>

        <div className='flex flex-col w-full gap-2'>
          {allProduct.map((item) => (
            <div className='p-2 rounded-md cursor-pointer ring-1 ring-black-200' key={item.title} onClick={
              () => setAllProduct(allProduct.filter(opt=>opt.title !== item.title))}>
              <span>{item.title}</span>
              <span>${item.price}</span>
              <span>${item.catSlug}</span>
            </div>
          ))}

        </div>

        







        <Button className='flex items-center justify-center w-full gap-2 p-2 text-white' type='submit' disabled={isLoading}>
           {isLoading? `Adding Product...`:
            `Add Product`
            
          }
        </Button>
        <span className='text-red-600 font-italics'> {message && message} </span>
        

    </form>
      )}
    </div>
  )
  
}

export default Page
