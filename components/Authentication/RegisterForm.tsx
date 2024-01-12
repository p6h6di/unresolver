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
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  //------ form validation
  const form = useForm<RegisterValidation>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  //------- sending data to server
  const { mutate: register, isPending } = useMutation({
    mutationFn: async ({ username, email, password }: RegisterValidation) => {
      const payload: RegisterValidation = {
        username,
        email,
        password,
      };
      const { data } = await axios.post("/api/auth/register", payload);
      return data as string;
    },
    // handling server errors
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast.error(err.response?.data);
        }
        if (err.response?.status === 409) {
          return toast.error(err.response?.data);
        }
      }
      return toast.error("Could not create an account.");
    },
    // after the user register
    onSuccess: () => {
      router.refresh();
      return router.push("/auth/send-email");
    },
  });

  //------ preparing data
  const onSubmit = (values: RegisterValidation) => {
    const payload: RegisterValidation = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    register(payload);
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
                      disabled={isPending}
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
                      disabled={isPending}
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
                      disabled={isPending}
                      placeholder="••••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isPending ? (
              <Button type="submit" isLoading={isPending} className="w-full" />
            ) : (
              <Button type="submit" className="w-full">
                Continue
              </Button>
            )}
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default RegisterForm;
