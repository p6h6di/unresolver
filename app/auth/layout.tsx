import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-20 flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
