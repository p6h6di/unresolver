import { LoginSchema } from "@/lib/validation/auth";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function POST(req: Request) {
    try {   
        // access the body
        const body = await req.json();
    
        // body validation
        const validateFields = LoginSchema.safeParse(body)
        if(!validateFields.success) {
            return new Response('Invalid fields.', { status: 400 })
        }
        const { email, password } = validateFields.data;
    
        // next-auth
        try {
         await signIn('credentials', {
            email, 
            password,
            redirectTo: '/',
           })  
    
        } catch (error) {
            if(error instanceof AuthError) {
                if(error.type === 'CredentialsSignin') {
                    return new Response('Invalid credentials!', { status: 422 })
                }
            }
        }    
        
        // sending res
        return new Response('User logged in successfully.', { status: 201 })
    } catch (error) {
         return new Response('Could not login, please try again later', { status: 500 })       
    }

}