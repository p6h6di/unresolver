import { ShieldX } from "lucide-react";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center">
      <ShieldX className="mb-2.5 h-8 w-8 text-red-500" />
      <h1 className="mb-1 text-center text-2xl font-bold">
        Oops! something went wrong
      </h1>
      <Link
        href="/auth/login"
        className="mt-1 text-center text-sm text-blue-500 hover:underline"
      >
        Go back to login.
      </Link>
      {/* <RotateCw className="w-8 h-8 animate-spin" /> */}
    </div>
  );
};

export default ErrorPage;
