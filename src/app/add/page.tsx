"use client"
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

const Page = () => {
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
            alert("Title is required");
            return;
        }
        
        if (!inputs.catSlug) {
            alert("Please select a category");
            return;
        }
        
        if (!file) {
            alert("Please upload an image");
            return;
        }

        setLoading(true)
        try {
            const url = await upload()
            const productData = {
            
                img: url,
                title: inputs.title.trim(),
                price: Number(inputs.price),
                desc: inputs.desc.trim(),
                catSlug: inputs.catSlug.trim(),
                isFeatured: inputs.isFeatured === true,
                options: options.map(opt => ({
                    _id:opt._id,
                    title: opt.title.trim(),
                    additionalPrice: Number(opt.additionalPrice)
                }))
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
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
    <div className="p-32 m-20">
      <form className='flex flex-wrap gap-4 p-8 shadow-lg' onSubmit={handleSubmit}>
        <h1>Add new product</h1>
        <div className='flex flex-col w-full gap-2'>
          <label>Title</label>
          <input onChange={handleChange} type="text" name="title" className='p-2 rounded-sm ring-1 ring-red-200'/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>Image</label>
          <input onChange={handleChangeImage} type="file" className='p-2 rounded-sm ring-1 ring-red-200'/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>Desc</label>
          <textarea onChange={handleChange} name="desc" className='p-2 rounded-sm ring-1 ring-red-200'/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>Price</label>
          <input onChange={handleChange} type="number" name="price" className='p-2 rounded-sm ring-1 ring-red-200'/>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>Category</label>
          <select onChange={handleChange} name="catSlug" className='p-2 rounded-sm ring-1 ring-red-200'>
            <option value="">Select a category</option>
            {allCat.map((item: Category) => (
              <option value={item.slug} key={item._id}>{item.title}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col w-full gap-2'>
            <label>Featured</label>
            <select onChange={handleChange} name="isFeatured" className='p-2 rounded-sm ring-1 ring-red-200'>
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>
        </div>


        <div className='flex flex-col w-full gap-2'>
          <label>Options</label>
          <div>
            <input onChange={changeOptions} className='p-2 rounded-sm ring ring-red-200' type="text" name="title" placeholder='Title' />
            <input onChange={changeOptions} className='p-2 rounded-sm ring ring-red-200' type="number" name="additionalPrice" placeholder='Additional Price' />
          </div>
          <button
            type="button"
            className='p-2 text-white bg-red-500 w-52'
            onClick={() => setOptions((prev) => [...prev, option])}
          >
            Add Options
          </button>
        </div>

        <div className='flex flex-col w-full gap-2'>
          {options.map((item) => (
            <div className='p-2 rounded-md cursor-pointer ring-1 ring-red-500' key={item.title} onClick={() => setOptions(options.filter(opt=>opt.title !== item.title))}>
              <span>{item.title}</span>
              <span>${item.additionalPrice}</span>
            </div>
          ))}
        </div>

        <button className='p-2 w-full bg-[#404212] text-white flex items-center justify-center gap-2' type='submit'>
          Add Product {isLoading && (
            <Image src="/temporary/p2.png" alt="loading" width={50} height={50} className='animate-spin bg-blend-multiply'/>
          )}
        </button>
      </form>
    </div>
  )
}

export default Page
