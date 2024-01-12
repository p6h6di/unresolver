"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div className="m-24">
      <h1 className="text-3xl">Unresolver</h1>
      <p>{JSON.stringify(session.data?.user)}</p>
    </div>
  );
}
