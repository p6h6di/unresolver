import NextAuth from "next-auth"
import {PrismaAdapter} from '@auth/prisma-adapter'
import authConfig from "@/auth.config"
import { prisma } from "@/prisma/client"
import { getUserById } from "@/data"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    // extending user data in the session
    async session({token, session}) {
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }
      if(token.username && session.user) {
        session.user.username = token.username as string;
      }
      return session;
    },
    // its content is forwarded to the session callback
    async jwt({token}) {
      // adding username in the token
      if(!token.sub) return token; 
      const existedUser = await getUserById(token.sub)
      if(!existedUser) return token;
      token.username = existedUser.username
      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig
})