import NextAuth from "next-auth"
import {PrismaAdapter} from '@auth/prisma-adapter'
import authConfig from "@/auth.config"
import { prisma } from "@/prisma/client"
import { getUserById } from "@/data"
import { generateUsername } from "unique-username-generator";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events: {
    // adding username in social providers
    async signIn({user}) {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: user.id
        }
      })
      if(!dbUser?.username) {
        await prisma.user.update({
          where: { id: dbUser?.id },
          data: {
            username: generateUsername('', 0, 10)
          }
        })
      }
    },
    // verify email for social providers
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
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