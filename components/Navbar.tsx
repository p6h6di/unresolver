import { Lightbulb } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Searchfield from "./Searchfield";
import { auth, signOut } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    //----------- FIX: Navbar is not responsive
    <nav className="fixed top-0 flex w-full h-14 bg-gradient-to-r from-slate-100 via-slate-100 to-slate-100 border-b border-gray-200 backdrop-blur-2xl">
      <div className="flex items-center justify-between w-4/5 m-auto">
        <div className="flex-none">
          <Link href="/" className="flex items-center text-black">
            <Lightbulb strokeWidth={2.5} className="w-6 h-6 mr-1" />
            <h1 className="text-2xl font-bold">unresolver</h1>
          </Link>
        </div>
        <div className="grow ">
          <Searchfield />
        </div>
        <div className="flex-none">
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
    </nav>
  );
};

export default Navbar;
