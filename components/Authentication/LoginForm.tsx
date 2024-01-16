"use client";

import { useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";
import { LoginSchema, LoginValidation } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ------ form validation
  const form = useForm<LoginValidation>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ------- sending data to server
  const { mutate: login, isPending } = useMutation({
    mutationFn: async ({ email, password }: LoginValidation) => {
      const payload: LoginValidation = {
        email,
        password,
      };
      const { data } = await axios.post("/api/auth/login", payload);
      return data as string;
    },
    // handling server error
    onError: (error) => {
      form.reset();
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          return toast.error("Invalid credentials!");
        }
      }
      return toast.error("Could not login, please try again later.");
    },
    // after the user login
    onSuccess: (data) => {
      router.refresh();
      if (data === "logged in") {
        return router.push("/");
      } else {
        return router.push("/auth/send-email");
      }
      // return toast.success("User logged in successfully.");
    },
  });

  // ------ preparing data
  const onSubmit = (values: LoginValidation) => {
    const payload: LoginValidation = {
      email: values.email,
      password: values.password,
    };
    login(payload);
  };

  // ------- social providers error handling
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" ? (
      <p className="text-left text-xs text-red-500">
        Another account already exists with the same e-mail address.
      </p>
    ) : (
      ""
    );

  return (
    <FormWrapper
      authLabel="Welcome back"
      authLead="Don't have an account?"
      authLinklabel="Sign Up"
      authLinkhref="/auth/register"
      showSocial
      authFooter="By clicking continue, you agree to our Terms of Service and Privacy Policy."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-4 w-full">
          <div className="space-y-2.5 text-left">
            {/* EMAIL_INPUT_FIELD */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={isPending}
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* PASSWORD_INPUT_FIELD */}
            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isPending}
                        placeholder="••••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute bottom-0 right-2 top-1.5">
                {/* RESET_PASSWORD_LINK */}
                <Link
                  href="/auth/reset"
                  className="text-xs font-medium text-muted-foreground hover:text-black
                  hover:underline"
                >
                  Forget password?
                </Link>
              </div>
            </div>
            {isPending ? (
              <Button type="submit" isLoading={isPending} className="w-full" />
            ) : (
              <Button type="submit" className="w-full">
                Continue
              </Button>
            )}
            {urlError}
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
