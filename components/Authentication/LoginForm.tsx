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

const LoginForm = () => {
  //------ form validation
  const form = useForm<LoginValidation>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //------ preparing data
  const onSubmit = (values: LoginValidation) => {};
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full my-4">
          <div className="space-y-2.5">
            {/* EMAIL_INPUT_FIELD */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
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
                        placeholder="••••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute top-1.5 bottom-0 right-2">
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
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;