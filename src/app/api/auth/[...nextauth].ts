import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        
        if (!credentials?.email || !credentials.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) return null;

        // Compare hashed password (we'll hash during signup)
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        console.log("found user", user);
        console.log("isValid", isValid);


        return { id: user.id, email: user.email };
      }
    })
  ],
  session: {
    strategy: "jwt" as const
  },
  pages: {
    signIn: "/signin"
  }
};

export default NextAuth(authOptions);
