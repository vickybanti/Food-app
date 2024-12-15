// "use client"
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { EmailRounded, Visibility, VisibilityOff } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
// import { signIn, useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useRouter } from 'next/navigation';
 //const SignupPage = () => {
//     const [showPassword, setShowPassword] = useState(false)
//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };
//   const [message, setMessage] = useState(false)

//   const router = useRouter();

//   const [inputs, setInputs] = useState({
//     email: "",
//     password:  "",
//     firstName:  "",
//     lastName: ""
//   })

//   const handleChange = (e:React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const target = e.target as HTMLInputElement;
//     setInputs(prev => {
//       return { ...prev, [target.name]: target.value }
//     })
//   } 

//   const handleSubmit = async() => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`,{
//         method:"POST",
//         body:JSON.stringify(inputs),
//         headers:{"Content-Type":"application/json"}
//       })
//       const postUser = await res.json()
//       console.log(postUser)
//       if(postUser){
//         setMessage(true)
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }


//   const {data,status} = useSession();
//   console.log('data',data)
//   console.log('status',status)
//  return (
    // <div className="flex items-center justify-center h-full px-4 pt-32 pb-14"
//     style={{backgroundImage: "url('/bread background.jpg')", backgroundSize: "cover", backgroundBlendMode:"color-dodge"}}>
//       {/* BOX */}
//       <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row w-[80%] backdrop-blur-lg bg-white/70">
//           <Link href="/">
//             <div className="w-[350px] h-[250px] mt-6 px-5 font-sans text-3xl font-bold">
//               <Image src="/logo-bg.png" width={500} height={770} alt="logo" className="object-contain" />
//               <h1 className="p-12">Sign up Here</h1>
//             </div>
          
//           </Link>
//         {/* IMAGE CONTAINER */}
//         {/* <div className="relative w-full md:w-1/2 bg-[#042D29] flex justify-center items-center flex-col gap-4">
       
//           <p className="text-lg text-gray-400 font-[italic] px-16 text-center">Log into your account using social buttons</p>
          
//         </div> */}
//         {/* FORM CONTAINER */}
//         <div className="p-10 flex flex-col gap-8 w-[100%] md:w-1/2 h-[100%] backdrop-blur-md bg-white/30 rounded-md">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 gap-4">
//           <div className="">
//           <Label>
//             First name
//           </Label>
          
//           <Input className="h-16 bg-gray-200 border-gray-200 w-60" name="firstName" type="text" value={inputs.firstName} onChange={handleChange} />
//           </div>

//           <div className="ml-28">
//           <Label>
//             Last name
//           </Label>
//           <Input className="h-16 bg-gray-200 border-gray-200 w-60" name="lastName" type="text" value={inputs.lastName} onChange={handleChange} />
//           </div>

//           <div>
//           <Label>
//             Email
//           </Label>
//           <div className="relative">
//             <EmailRounded className="absolute transform -translate-y-1/2 left-3 top-1/2" />
//             <Input 
//               className="h-16 pl-10 bg-gray-200 border-gray-200 w-60" 
//               name="email" 
//               type="email" 
//               value={inputs.email} 
//               onChange={handleChange} 
//             />
//           </div>
//           </div>

//           <div className="ml-28">
//           <Label>
//             Password
//             </Label>

//             <div className="relative">
//             <div onClick={handleClickShowPassword}>

            
//                     {showPassword ? <VisibilityOff className="absolute transform -translate-y-1/2 left-3 top-1/2"/> 
//                     : <Visibility className="absolute transform -translate-y-1/2 left-3 top-1/2"/>}
//                 </div>
          
//           <Input className="h-16 pl-10 bg-gray-200 border-gray-200 w-60" name="password" type={showPassword?"text":"password"} value={inputs.password} onChange={handleChange}/>
//             </div>
// </div>

//           </div>
//             <Button type="submit" className="w-20 px-32 my-10 text-lg mx-36 py-7">
//                 Sign up
//             </Button>
          
//         </form>
//         <span className="mt-[-50px] mx-auto">Or sign in with your social accounts</span>
//         <div className="flex gap-3 mt-[-20px]">
//           <button className="flex gap-4 p-4 rounded-md ring-1 ring-orange-100" onClick={()=>signIn("google")}>
//             <Image
//               src="/google.png"
//               alt=""
//               width={20}
//               height={20}
//               className="object-contain"
              
//             />
//             <span>Sign in with Google</span>
//           </button>
//           <button className="flex gap-4 p-4 rounded-md ring-1 ring-blue-100" onClick={()=>signIn("facebook")}>
//             <Image
//               src="/facebook.png"
//               alt=""
//               width={20}
//               height={20}
//               className="object-contain"
//             />
//             <span>Sign in with Facebook</span>
//           </button>
//           </div>
//           <p className="text-sm mt-[-30px]">
//              Have an account?<Link className="text-lg hover:underline text-green" href="/login"> Login</Link>
//           </p>
//         </div>
//       </div>
    // </div>
 // );
//};
 const SignupPage = () => {
  return (
    <div>
      Signup
    </div>
  )
 }


