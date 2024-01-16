import { auth } from "@/lib/auth";

export default auth((req) => {
  // req.auth
});

// Invoke all routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
