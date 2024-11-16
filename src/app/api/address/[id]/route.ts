import User from "@/lib/database/models/user.model";
import { connectToDb } from "@/lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";



export const GET = async(req:NextRequest, {params}: {params:{id:string}}) => {
  const {id} = params
  try {
      await connectToDb();
      const allUsers = await User.findById({_id:id});
      console.log("allusers", allUsers)
      return new NextResponse(JSON.stringify(allUsers))
  } catch (error) {
      console.log(error)
      return new NextResponse(
          JSON.stringify("Somethong went wrong"), 
          {status:200})

  }
  return new NextResponse("Hello", {status:200})

}


