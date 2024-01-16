"use client";

import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SendEmail = () => {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden">
      <div className="md:flex">
        <div className="w-full p-5">
          <div className="text-center">
            <div className="flex justify-center">
              <Icons.send_email className="h-10 w-10" />
            </div>
            <h1 className="mb-1 text-3xl font-bold">Check you email</h1>
            <p className="mb-1 text-sm text-muted-foreground">
              We sent you a verification link. Be sure to check your your spam
              too.
            </p>
            <Link
              href="/auth/login"
              className={buttonVariants({
                variant: "link",
                className: "text-blue-700",
              })}
            >
              <span>Go to login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
