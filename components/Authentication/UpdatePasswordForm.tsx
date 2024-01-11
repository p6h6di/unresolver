"use client";

import { useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";
import {
  UpdatePasswordSchema,
  UpdatePasswordValidation,
} from "@/lib/validation/auth";
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

const UpdatePasswordForm = () => {
  //------ form validation
  const form = useForm<UpdatePasswordValidation>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  //------ preparing data
  const onSubmit = (values: UpdatePasswordValidation) => {};
  return (
    <FormWrapper
      authLabel="Set up a new password"
      authLead="Your password must be different from your previous one."
      authLinklabel=""
      authLinkhref=""
      authFooter=""
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full my-4">
          <div className="space-y-2.5">
            {/* NEW_PASSWORD_INPUT_FIELD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* CONFIRM_PASSWORD_INPUT_FIELD */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default UpdatePasswordForm;
