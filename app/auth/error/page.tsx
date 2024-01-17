"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import lottie from "lottie-web";

const ErrorPage = () => {
  useEffect(() => {
    const container = document.getElementById("lottie-container");
    const animation = lottie.loadAnimation({
      // @ts-expect-error
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/error.json",
    });

    return () => {
      animation.destroy(); // Clean up the animation when the component unmounts
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center rounded-lg p-4">
      <div id="lottie-container" className="mb-4 h-48 w-48"></div>
      <h1 className="mb-1.5 text-center text-xl font-bold md:text-3xl">
        Oops! something went wrong
      </h1>
      <p className="mb-1.5 text-center text-xs text-muted-foreground">
        An error occurred while processing your request. Please try again later.
      </p>
      <Link
        href="/auth/login"
        className="mt-1 text-center text-sm text-blue-500 hover:underline"
      >
        Go back to login.
      </Link>
    </div>
  );
};

export default ErrorPage;
