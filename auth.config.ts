import GitHub from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./lib/validation/auth"
import { prisma } from "./prisma/client"
import bcrypt from 'bcryptjs'

export default {
  providers: [
    //------ USER_LOGIN
    Credentials({
      async authorize(credentials) {
        // Validation
        const validatedFields = LoginSchema.safeParse(credentials)
        if(validatedFields.success) {
          const { email, password } = validatedFields.data

          // user create account with social providers and login with credentials then return null
          const user = await prisma.user.findUnique({
            where: {
              email,
            }
          })
          if(!user || !user.password) return null;

          // matching passwords
          const passwordMatch = await bcrypt.compare(password, user.password)
          if(passwordMatch) return user;
        }
        return null;
      }
    })
  ],
} satisfies NextAuthConfig