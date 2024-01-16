import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { auth, signOut } from "@/lib/auth";
import SearchField from "./SearchField";
import { Icons } from "./Icons";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="border-b border-gray-200 bg-gradient-to-r from-slate-100 via-slate-100 to-slate-100 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* LOGO */}
            <Link href="/" className="flex items-center text-black">
              <Icons.logo className="mr-2 h-7 w-7" />
              <h1 className="text-xl font-bold">unresolver</h1>
            </Link>
          </div>
          {/* SEARCH_INPUT_FIELD */}
          <div className="hidden w-full flex-1 md:block md:w-auto">
            <SearchField />
          </div>
          <div className="flex items-center">
            {session?.user ? (
              <form
                action={async () => {
                  "use server";

                  await signOut();
                }}
              >
                <span>{session.user.email}</span>
                <Button type="submit">Logout</Button>
              </form>
            ) : (
              <Link href="/auth/login" className={buttonVariants()}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
