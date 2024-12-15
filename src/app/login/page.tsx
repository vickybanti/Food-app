"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmailRounded } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};
  const [message, setMessage] = useState(false)

  const [inputs, setInputs] = useState({
    email:""
    
  })

  const handleChange = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLInputElement;
    setInputs(prev => {
      return { ...prev, [target.name]: target.value }
    })
  } 

  


  const {data,status} = useSession();
  console.log('data',data)
  console.log('status',status)
  return (
    <div className="flex items-center justify-center h-full px-4 pt-32 pb-14"
    style={{backgroundImage: "url('/bread background.jpg')", backgroundSize: "cover", backgroundBlendMode:"color-dodge"}}>
      {/* BOX */}
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row w-[80%] backdrop-blur-lg bg-white/70">
          <Link href="/">
            <div className="w-[350px] h-[250px] mt-6 px-5 font-sans text-3xl font-bold">
              <Image src="/logo-bg.png" width={500} height={770} alt="logo" className="object-contain" />
              <h1 className="p-12">Login Here</h1>
            </div>
          </Link>
        {/* IMAGE CONTAINER */}
        {/* <div className="relative w-full md:w-1/2 bg-[#042D29] flex justify-center items-center flex-col gap-4">
       
          <p className="text-lg text-gray-400 font-[italic] px-16 text-center">Log into your account using social buttons</p>
          
        </div> */}
        {/* FORM CONTAINER */}
        <div className="p-10 m-auto flex flex-col gap-10 w-[100%] md:w-1/2 h-[100%] backdrop-blur-md bg-white/30 rounded-md">
        <h2>Login with email</h2>
        
          <div className="flex justify-between">
          

          <div>
          <Label>
            Email
          </Label>
          <div className="relative">
            <EmailRounded className="absolute transform -translate-y-1/2 left-3 top-1/2" />
            <Input 
              className="h-16 pl-10 bg-gray-200 border-gray-200 w-60" 
              name="email" 
              type="email" 
              onChange={() => handleChange} 
            />

            
          
          
          
          </div>

          </div>
          <Button type="submit" onClick={()=>signIn(`email`)} className="p-8 mt-6 mr-24">
            Login
          </Button>
          

          {/* <div>
          <Label>
            Password
            </Label>
            <div className="relative">
              <div onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <VisibilityOff className="absolute transform -translate-y-1/2 left-3 top-1/2" /> 
                : <Visibility className="absolute transform -translate-y-1/2 left-3 top-1/2"/>}
              </div>
          <Input className="h-16 pl-10 bg-gray-200 border-gray-200 w-60" name="password" type={showPassword?"text":"password"} onChange={(e) => handleChange}/>
            </div>
</div> */}


          </div>
         

          
        
        <span className="mt-[-20px] mx-auto">Or sign in with your social accounts</span>
        <div className="flex gap-3 mt-[-20px]">
          <button className="flex gap-4 p-4 rounded-md ring-1 ring-orange-100" onClick={()=>signIn("google")}>
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
              
            />
            <span>Sign in with Google</span>
          </button>
          <button className="flex gap-4 p-4 rounded-md ring-1 ring-blue-100" onClick={()=>signIn("facebook")}>
            <Image
              src="/facebook.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Facebook</span>
          </button>
          </div>
          <p className="text-sm mt-[-30px]">
            <Link className="text-lg hover:underline text-green" href="/"> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
