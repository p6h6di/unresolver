import { auth } from "@/lib/auth";
import { PostSchema } from "@/lib/validation/post";
import { prisma } from "@/prisma/client";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    // body validation
    const body = await req.json();
    const { title, content } = PostSchema.parse(body);

    // check if user is authorized or not
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // create new post
    await prisma.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response(
      "Could not post to unresolver at this time. Please try later",
      { status: 500 }
    );
  }
}
