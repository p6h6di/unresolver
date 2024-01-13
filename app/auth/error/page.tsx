import { ShieldX } from "lucide-react";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center">
      <ShieldX className="w-8 h-8 mb-2.5 text-red-500" />
      <h1 className="text-2xl font-bold mb-1 text-center">
        Oops! something went wrong
      </h1>
      <Link
        href="/auth/login"
        className="mt-1 text-sm text-blue-500 text-center hover:underline"
      >
        Go back to login.
      </Link>
      {/* <RotateCw className="w-8 h-8 animate-spin" /> */}
    </div>
  );
};

export default ErrorPage;
