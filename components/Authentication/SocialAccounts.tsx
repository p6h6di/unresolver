"use client";

import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { signIn } from "next-auth/react";

const SocialAccounts = () => {
  // ------ LOGIN_WITH_SOCIAL_ACCOUNTS
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };
  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => onClick("google")}
      >
        <Icons.google className="mr-2 h-[18px] w-[18px]" />
        <span className="text-sm font-medium">Google</span>
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => onClick("github")}
      >
        <Icons.github className="mr-2 h-[18px] w-[18px]" />
        <span className="text-sm font-medium">Github</span>
      </Button>
    </>
  );
};

export default SocialAccounts;
