"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'



type Inputs = {
    title: string;
    desc:string;
    slug:string;
}



const CategoriesPage = () => {
    const router = useRouter()
    const {data:session, status} =  useSession()
    const [file, setFile] = useState<File>()
    const [isLoading, setLoading] = useState(false)
    const [inputs, setInputs] = useState<Inputs>({
        title:"",
        slug:"",
        desc:""
    })

   

    const handleChange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => {
             return {...prev,[e.target.name]:e.target.value
        }
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
        const url = await upload()
        setLoading(true)
        try {
         const res= await fetch(`/api/categories`,{
            method: "POST",
            body:JSON.stringify({
                img:url,
                ...inputs,
                
            }),
            headers: {
                'Content-Type': 'application/json',
              },
            

         })   
         const data = await res.json()
         console.log(data)
         if(data){
        setLoading(false)
        setInputs({
            title:"",
        slug:"",
        desc:""
        })
         }
         

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="p-32 m-20 ">
          <form className='flex flex-wrap gap-4 p-8 shadow-lg' onSubmit={handleSubmit} >
              <h1>Add new category</h1>
              <div className='flex flex-col w-full gap-2'>
                  <label>Title</label>
                  <input onChange={handleChange} type="text" name="title" className='p-2 rounded-sm ring-1 ring-red-200'/>
              </div>

              <div className='flex flex-col w-full gap-2'>
                  <label>Image</label>
                  <input onChange={handleChangeImage} type="file"  className='p-2 rounded-sm ring-1 ring-red-200'/>
              </div>
              <div className='flex flex-col w-full gap-2'>
                  <label>Desc</label>
                  <input onChange={handleChange} name="desc" className='p-2 rounded-sm ring-1 ring-red-200' type="text"/>
              </div>
              
              <div className='flex flex-col w-full gap-2'>
                  <label>slug</label>
                  <input onChange={handleChange} name="slug" className='p-2 rounded-sm ring-1 ring-red-200' type="text"/>
              </div>

             

             
                
                   
          <button className='p-2 w-full bg-[#404212] text-white flex items-center justify-center gap-2' type='submit'>{isLoading ? "" : "Add Category"}  {isLoading && (<Image src="/temporary/p2.png" alt="loading" width={50} height={50} className='animate-spin bg-blend-multiply'/>)}</button>
        
        </form>
    </div>
  )
}

export default CategoriesPage
