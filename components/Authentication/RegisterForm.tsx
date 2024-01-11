"use client";

import { useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";
import { RegisterSchema, RegisterValidation } from "@/lib/validation/auth";
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

const RegisterForm = () => {
  //------ form validation
  const form = useForm<RegisterValidation>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  //------ preparing data
  const onSubmit = (values: RegisterValidation) => {
    console.log(values);
  };
  return (
    <FormWrapper
      authLabel="Create an account"
      authLead="Already have an account?"
      authLinklabel="Log in"
      authLinkhref="/auth/login"
      showSocial
      authFooter="By clicking continue, you agree to our Terms of Service and Privacy Policy."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full my-4">
          <div className="space-y-2.5">
            {/* USERNAME_INPUT_FIELD */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="username"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* PASSWORD_INPUT_FIELD */}
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
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default RegisterForm;
