import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email address is invalid" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

// ------ FIX: username regex
export const RegisterSchema = z.object({
  username: z
    .string()
    .toLowerCase()
    .min(6, { message: "Username must be at least 6 characters" })
    .transform((value) => value.replace(/\s+/g, "")),
  email: z.string().email({ message: "Email address is invalid" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email address is invalid" }),
});

export const UpdatePasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const TokenSchema = z.object({
  token: z.string(),
});

export type LoginValidation = z.infer<typeof LoginSchema>;
export type RegisterValidation = z.infer<typeof RegisterSchema>;
export type ResetValidation = z.infer<typeof ResetSchema>;
export type UpdatePasswordValidation = z.infer<typeof UpdatePasswordSchema>;
export type TokenValidation = z.infer<typeof TokenSchema>;
