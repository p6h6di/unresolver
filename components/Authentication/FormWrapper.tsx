import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import SocialAccounts from "./SocialAccounts";

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
    <div className="flex flex-col items-center w-[420px]  p-8">
      {/* <div className="border p-2 rounded-md block"> */}
      <Lightbulb strokeWidth={2.5} className="w-8 h-8" />
      {/* </div> */}
      <h1 className="text-2xl font-bold mt-2 text-center">{authLabel}</h1>
      <p className="text-sm text-muted-foreground text-center">
        <span>{authLead}</span>
        <Link
          href={authLinkhref}
          className="text-blue-600 ml-1 hover:underline"
        >
          {authLinklabel}
        </Link>
      </p>
      {children}

      {showSocial && (
        <>
          <div className="flex items-center w-full">
            <Separator className="w-28" />
            <span className="text-muted-foreground text-xs mx-2 font-medium">
              OR CONTINUE WITH
            </span>
            <Separator className="w-28" />
          </div>
          <div className="flex w-full items-center justify-between gap-x-2 mb-2 mt-3">
            <SocialAccounts />
          </div>
        </>
      )}

      <p className="text-xs text-muted-foreground text-center">{authFooter}</p>
    </div>
  );
};

export default FormWrapper;
