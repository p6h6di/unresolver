import { prisma } from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // in one hour

  // if we already send token to this email then
  const existedToken = await prisma.verificationToken.findFirst({
    where: { email },
  });
  if (existedToken) {
    await prisma.verificationToken.delete({
      where: { id: existedToken.id },
    });
  }

  // generate new verification token
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
