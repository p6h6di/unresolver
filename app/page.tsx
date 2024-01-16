"use client";
// import { useSession } from "next-auth/react";

export default function Home() {
  // const session = useSession();
  return (
    <div>
      <p className="m-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur autem
        unde expedita at corrupti maiores provident aliquam vero amet cumque?
      </p>
      {/* <h1 className="text-3xl"></h1>
      <p>{JSON.stringify(session.data?.user)}</p> */}
    </div>
  );
}
