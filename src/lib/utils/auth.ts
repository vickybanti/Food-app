import NextAuth, { getServerSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";
import { connectToDb } from "./connect"
import { PrismaAdapter } from "@auth/prisma-adapter"
import User from "../database/models/user.model";

declare module "next-auth"{
  interface Session{
    user:User & {
      isAdmin:Boolean;
    }
  }
}

declare module "next-auth/jwt"{
  interface JWT{
    
      isAdmin:Boolean;
    
  }
}

export const authOptions:NextAuthOptions = {
    // Configure one or more authentication providers
   
    session:{
    strategy:"jwt"
},
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
        httpOptions: {
          timeout: 10000, // 10 seconds
        },
      
      
      }),

      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        httpOptions: {
          timeout: 10000, // 10 seconds
        },
      })
      
      // ...add more providers here
    ],
    callbacks:{
      async session({token, session}) {
        if(token){
          session.user.isAdmin = token.isAdmin
        }
        return session
      },
      async jwt({token}) {
        await connectToDb();
        const userInDb = await User.findOne({
          where:{
            email:token.email!
          }
        })
        token.isAdmin=userInDb?.isAdmin!
        return token
       
        }
      }
    }
  
  export const getAuthSession = () => getServerSession(authOptions)
