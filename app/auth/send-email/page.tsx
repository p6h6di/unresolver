"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SendEmail = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <Mail className="w-7 h-7 mb-2" />
      <h1 className="text-2xl font-bold mb-1">Check you email</h1>
      <p className="text-sm text-muted-foreground mb-4 text-center">
        We sent you a verification link. Be sure to check your your spam too.
      </p>
      <Button variant="outline" onClick={() => router.back()}>
        Back
      </Button>
    </div>
  );
};

export default SendEmail;
