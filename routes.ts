//* * routes that are accessible to public*/
export const publicRoutes = ["/", "/auth/send-email", "/auth/verify-email"];

//* * routes that are used to authentication */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/update/password",
];

//* * the prefix for api authentication route */
export const apiAuthPrefix = "/api/auth";

//* * default redirect path after logging in */
export const DEFAULT_LOGIN_REDIRECT = "/";
