"use client";

import FormWrapper from "./FormWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema, ResetValidation } from "@/lib/validation/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ResetForm = () => {
  // ------ form validation
  const form = useForm<ResetValidation>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  // ------ preparing data
  const onSubmit = (values: ResetValidation) => {};
  return (
    <FormWrapper
      authLabel="Reset password"
      authLead="Go back to"
      authLinklabel="login."
      authLinkhref="/auth/login"
      authFooter="Include the email address associated with your account and we&#8242;ll send
      you an email with instructions to reset your password."
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
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default ResetForm;
