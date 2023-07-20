import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export const AuthOptions={
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ],
      session:{
        strategy:"jwt"
      },
      callbacks:{
        async signin({user,account,profile,email,credentials}){
          return true
        },
        async jwt({token,account,user}){
          if(user){
            token.id=user.id
          }
          return token
        },
        async session({token, session}){
          if(token){
            session.user.id=token.id
          }
          return session
        }
      }
}

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST};