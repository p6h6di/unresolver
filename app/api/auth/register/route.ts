import { sendVerificationEmail } from "@/lib/resend";
import { generateVerificationToken } from "@/lib/token";
import { RegisterSchema } from "@/lib/validation/auth";
import { prisma } from "@/prisma/client";
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        // access the body
        const body = await req.json();
    
        // body validation
        const validateFields = RegisterSchema.safeParse(body)
        if(!validateFields.success) {
            return new Response('Invalid fields.', { status: 400 })
        }
        const { username, email, password } = validateFields.data
    
        // check if username already existed in db
        const existedUsername = await prisma.user.findUnique({
            where: {
                username
            }
        })
        if(existedUsername) {
            return new Response('Username already exists.', { status: 409 })
        }

        // check if email already existed in db
        const existedEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(existedEmail) {
            return new Response('Email already exists.', { status: 409 })
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // creating the user
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        // generate verification token
        const verificationToken = await generateVerificationToken(email)

        // send verification email
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return new Response('Confirmation email sent!', {status: 200})
        
    } catch (error) {
        return new Response('Could not create an account.', { status: 500 })
    }
}