import { getUserByEmail } from "@/data";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  const body = await req.json();

  // if token does not exist
  const existedToken = await prisma.verificationToken.findUnique({
    where: {
      token: body,
    },
  });
  if (!existedToken) {
    return new Response("Token does not exist.", { status: 404 });
  }

  // if token is expired
  const hasExpired = new Date(existedToken.expires) < new Date();
  if (hasExpired) {
    return new Response("Token has expired.", { status: 422 });
  }

  // if user change the email
  const existedUser = await getUserByEmail(existedToken.email);
  if (!existedUser) {
    return new Response("Token does not exist.", { status: 404 });
  }

  // updating email verification
  await prisma.user.update({
    where: { id: existedUser.id },
    data: {
      emailVerified: new Date(),
      email: existedToken.email,
    },
  });

  // deleting verification token
  await prisma.verificationToken.delete({
    where: {
      id: existedToken.id,
    },
  });

  return new Response("Email verified!", { status: 201 });
}
