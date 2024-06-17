// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({});

// export const config = {
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
//   };
// export { default } from "next-auth/middleware"

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/shoppingarea"] }
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ token }) => {
      // If there is a token, the user is authenticated
      return !!token;
    },
  },
});

// Specify the matcher to protect specific routes
export const config = {
  matcher: ['/about','/cart','/shoppingarea','/home','/'],
};
