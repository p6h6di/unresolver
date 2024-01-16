import React from "react";
import Link from "next/link";
import SocialAccounts from "./SocialAccounts";
import { Icons } from "../Icons";

interface FormWrapperProps {
  children: React.ReactNode;
  authLabel: string;
  authLead: string;
  authLinklabel: string;
  authLinkhref: string;
  showSocial?: boolean;
  authFooter: string;
}

const FormWrapper = ({
  children,
  authLabel,
  authLead,
  authLinklabel,
  authLinkhref,
  showSocial,
  authFooter,
}: FormWrapperProps) => {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden">
      <div className="md:flex">
        <div className="w-full p-5">
          <div className="text-center">
            <div className="flex justify-center">
              <Icons.logo className=" h-8 w-8" />
            </div>
            <h1 className="mt-2  text-2xl font-bold">{authLabel}</h1>
            <p className="text-sm text-muted-foreground">
              <span>{authLead}</span>
              <Link
                href={authLinkhref}
                className="ml-1 text-blue-600 hover:underline"
              >
                {authLinklabel}
              </Link>
            </p>
            {children}
            {showSocial && (
              <>
                <div className="flex items-center">
                  <div className="grow border-b border-zinc-200"></div>
                  <span className="mx-2 text-xs font-medium text-muted-foreground">
                    OR CONTINUE WITH
                  </span>
                  <div className="grow border-b border-zinc-200"></div>
                </div>

                <div className="mb-2 mt-3 flex w-full items-center justify-between gap-x-2">
                  <SocialAccounts />
                </div>
              </>
            )}
            <p className="text-left text-xs text-muted-foreground">
              {authFooter}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
