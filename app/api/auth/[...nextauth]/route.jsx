import NextAuth from "next-auth/next";
import prisma from "../../../libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "deepansu" },
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.hashedPassword) {
          throw new Error('Wrong account') ;
        }
        const isMatched = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
          );
          if (!isMatched) {
            throw new Error('Wrong password') ;
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // debug: process.env.NODE_ENV === "development",
  debug:false,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };