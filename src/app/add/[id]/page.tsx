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


type Inputs = {
    _id:string;
    title:string;
    price:number;
    desc:string;
    catSlug:string;
    isFeatured:boolean;
}


type Option = {
  _id?:string;
    title:string;
    additionalPrice:number 
}

type Category = {
  _id?:string;
    title: string;
    slug: string;
}

type Product = {
  title:string;
  desc:string;
  price:number;
  catSlug:string;
  isFeatured:boolean;

}

const Page = ({ params }: { params: { id: string } }) => {
  const {id} = params;
    const router = useRouter()
    const {data:session, status} =  useSession()
    const [file, setFile] = useState<File>()
    const [isLoading, setLoading] = useState(false)
    const [inputs, setInputs] = useState<Inputs>({
        _id:"",
        title: "",
        price: 0,
        desc: "",
        catSlug: "",
        isFeatured: false,
    })

    const [allProduct, setAllProduct] = useState<Product[]>([])
    const [allCat, setCat] = useState<Category[]>([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        const getCat = async() => {
            const cats = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`)
            const data = await cats.json()
            setCat(data)
        }
        getCat()
    },[])

    const [option, setOption] = useState<Option>({
        title: "",
        additionalPrice:0

    })
    const [options, setOptions] = useState<Option[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setInputs(prev => {
            const value = e.target.name === "price" ? Number(e.target.value) : e.target.value;
            return {...prev, [e.target.name]: value}

            
        })
    }

    const handleAllProducts = () => {
      setOptions((prev) => [...prev, option])
      setInputs({
        _id:"",
        title: "",
        price: 0,
        desc: "",
        catSlug: "",
        isFeatured: false,
    })
    }
   

        const changeOptions =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            
            setOption(prev => {
                const value = e.target.name === "additionalPrice" ? Number(e.target.value) : e.target.value;
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
        
        if (!inputs.title.trim()) {
           setMessage("product title is required");
            return;
        }
        
        if (!inputs.catSlug) {
          setMessage("select a category");
          return;
        }
        if (!inputs.desc) {
          setMessage("product description is required");
          return;
        }
        if (inputs.desc.length < 2 ) {
          setMessage("product title characters must be greater than two");
          return;
        }

        if (inputs.desc.length < 2 ) {
          setMessage("product description characters must be greater than two");
          return;
        }
        if (inputs.desc.length > 1000 ) {
          setMessage("product description characters must be less than 1000");
          return;
        }
        
        if (!file) {
            setMessage("Please upload an image");
            return;
        }

        setLoading(true)
        try {
            const url = await upload()
            const productData = allProduct.map((pro) => {
              return {
                  img: url,
                  title: pro.title.trim(),
                  desc: pro.desc.trim(),
                  catSlug: pro.catSlug.trim(),
                  price: Number(pro.price),
                  isFeatured: pro.isFeatured,
                  restaurantId: id,
                  options: options.map(opt => ({
                      _id: opt._id,
                      title: opt.title.trim(),
                      additionalPrice: Number(opt.additionalPrice)
                  }))
              };
          });

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/restaurants/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({productData:productData})
            })   

            const data = await res.json()
            console.log(data)
            console.log(data._id)
            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong')
            }
            
            router.push(`${process.env.NEXT_PUBLIC_URL}/product/${data._id}`)
        } catch (error) {
            console.error(error)
            alert(error instanceof Error ? error.message : "Error submitting product")
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="p-32 mx-10 ">
      <form className='flex flex-wrap gap-4 p-8 shadow-lg w-[75%] m-auto bg-white' onSubmit={handleSubmit}>
        <h1>Add new product</h1>
        <div className='flex flex-col w-full gap-2'>
          <Label>Title</Label>
          <Input onChange={handleChange} type="text" name="title" className='p-2 rounded-sm ring-1 ring-black-200'/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>Image</Label>
          <Input onChange={handleChangeImage} type="file" className='p-2 rounded-sm ring-1 ring-black-200'/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>Desc</Label>
          <textarea onChange={handleChange} name="desc" className='p-2 rounded-sm ring-1 ring-black-200'/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>Price</Label>
          <Input onChange={handleChange} type="number" name="price" className='p-2 rounded-sm ring-1 ring-black-200'/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>Category</Label>
          <select onChange={handleChange} name="catSlug" className='p-2 rounded-sm ring-1 ring-black-200'>
            <option value="">Select a category</option>
            {allCat.map((item: Category) => (
              <option value={item.slug} key={item._id}>{item.title}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col w-full gap-2'>
            <Label>Featured</Label>
            <select onChange={handleChange} name="isFeatured" className='p-2 rounded-sm ring-1 ring-black-200'>
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
            onClick={handleAllProducts}
          >
            Add Options
          </Button>

        </div>

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
            onClick={() => setAllProduct((prev) => [...prev, inputs])}
          >
            Add product
          </Button>


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

        <Button className='p-2 w-full text-white flex items-center justify-center gap-2' type='submit' disabled={isLoading}>
          Add Product {isLoading && (
            <Image src="/temporary/p2.png" alt="loading" width={50} height={50} className='animate-spin bg-blend-multiply'/>
          )}
        </Button>
        <span className='font-italics text-red-600'> {message && message} </span>

      </form>
    </div>
  )
}

export default Page