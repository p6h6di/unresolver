import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(128, { message: "Title must be at least 128 characters" }),
  content: z.any(),
});

export type PostValidation = z.infer<typeof PostSchema>;
