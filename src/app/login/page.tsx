"use client"
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  const {data,status} = useSession();
  console.log('data',data)
  console.log('status',status)
  return (
    <div className="flex items-center justify-center h-full p-4 mt-40 mb-24"
    style={{backgroundImage: "url('/bread background.jpg')", backgroundSize: "cover"}}>
      {/* BOX */}
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:w-full lg:w-[80%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative w-full md:w-1/2 bg-[#042D29] flex justify-center items-center flex-col gap-4">
        <h1 className="text-5xl font-bold text-white xl:text-3xl text-bold font-[italic]">Welcome to BantiBiz</h1>
          <p className="text-lg text-gray-400 font-[italic] px-16 text-center">Log into your account using social buttons</p>
          
        </div>
        {/* FORM CONTAINER */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2 h-[100%]">
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
          <p className="text-sm">
            Have a problem?<Link className="underline" href="/"> Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
