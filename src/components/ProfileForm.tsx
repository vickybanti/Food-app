import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"




function ProfileForm({ className }: React.ComponentProps<"form">) {

    type Product = {

        _id:string;
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
    
   


    const [allCat, setCat] = useState<Category[]>([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getCat = async() => {
            const cats = await fetch(`/api/categories`)
            const data = await cats.json()
            setCat(data)
        }
        getCat()
    },[])

    const changeOptions =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            
        setOption(prev => {
            const value = e.target.name === "additionalPrice" ? Number(e.target.value) : e.target.value;
            return {...prev, [e.target.name]: value}
        })

}

const [products, setProducts] = useState<Product>({
    _id:"",
    title:"",
    desc:"",
    catSlug:"",
    price:0,
    isFeatured:false
    
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProducts(prev => {
        const value = e.target.name === "price" ? Number(e.target.value) : e.target.value;
        return {...prev, [e.target.name]: value}
    })
}

const [file, setFile] = useState<File>()



    const [option, setOption] = useState<Option>({
        _id:"",
        title: "",
        additionalPrice:0

    })
    const [options, setOptions] = useState<Option[]>([])
    const [message, setMessage] = useState("")

    const handleProductImage = (e:React.ChangeEvent<HTMLInputElement>) => {
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




   
        
        if (!products.title.trim()) {
           setMessage("product title is required");
            return;
        }
        
       
        if (!products.desc) {
          setMessage("product description is required");
          return;
        }
        if (products.price < 1 ) {
          setMessage("product price characters must be greater than zero");
          return;
        }
        if (!products.catSlug ) {
            setMessage("please input a category");
            return;
          }

        
       
        
        if (!file) {
            setMessage("Please upload an image");
            return;
        }

        setLoading(true)
        try {
            const url = await uploadProductImage()
            const productData = {
                img: url,
                title: products.title.trim(),
                desc: products.desc.trim(),
                catSlug: products.catSlug.trim(),
                price: Number(products.price),
                
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
      <form className={cn("grid items-start gap-4 w-full", className)}>
        <div className='flex flex-col w-full gap-2'>
          <Label>Product title</Label>
          <Input onChange={handleChange} className='p-2 rounded-sm w-full ring-black-200' type="text" name="title" placeholder='Title' />

          
        </div>

        <div className='flex flex-col w-full gap-2'>
          <Label>Product title</Label>
          <textarea onChange={handleChange} className='p-2 rounded-sm w-full ring-black-200'  name="desc" placeholder='Title' />

          
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
            onClick={() => setOptions((prev) => [...prev, option])}
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
        <Button type="submit">Save changes</Button>
      </form>
    )
  }

  export default ProfileForm;