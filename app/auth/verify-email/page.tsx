"use client";

// import { Button } from "@/components/ui/button";
import { Mail, MoreHorizontal, RotateCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SendEmail = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <Mail className="w-7 h-7 mb-2" />
      <h1 className="text-2xl font-bold mb-1 text-center">
        Confirming your verification
      </h1>
      <Link
        href="/auth/login"
        className="text-sm text-muted-foreground mb-4 text-center hover:text-black hover:underline"
      >
        Go back to login.
      </Link>
      <RotateCw className="w-8 h-8 animate-spin" />
    </div>
  );
};

export default SendEmail;
