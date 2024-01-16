"use client";

import { Icons } from "@/components/Icons";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { RotateCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const SendEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  // ------- sending data to server
  const { mutate: verifyEmail } = useMutation({
    mutationFn: async (token: string) => {
      const payload: string = JSON.stringify(token);
      console.log(payload);
      const { data } = await axios.post("/api/auth/verify-email", payload);
      return data as string;
    },
    // server error handling
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return toast.error("Token does not exist");
        }
        if (error.response?.status === 422) {
          return toast.error("Token has expired");
        }
      }
      return toast.error(
        "Could not verify your token, please try again later."
      );
    },
    // after verification
    onSuccess: () => {
      router.refresh();
      return router.push("/auth/login");
    },
  });

  useEffect(() => {
    if (!token) return;
    verifyEmail(token as string);
  }, [verifyEmail, token]);
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden">
      <div className="md:flex">
        <div className="w-full p-5">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <Icons.verify_email className="h-8 w-8" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">
              Confirming your verification
            </h1>
            {token ? (
              <p className="rounded-md border  bg-gray-50 p-2.5 text-xs text-gray-400">
                {token}
              </p>
            ) : null}
            <div className="mt-4 flex justify-center">
              <RotateCw className="h-8 w-8 animate-spin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
