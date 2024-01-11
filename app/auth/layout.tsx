import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
