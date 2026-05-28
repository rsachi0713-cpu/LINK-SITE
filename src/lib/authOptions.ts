import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("[AUTH] Authorize started for email:", credentials?.email);
          if (!credentials?.email || !credentials?.password) {
            console.log("[AUTH] Email or password not provided");
            return null;
          }

          console.log("[AUTH] Querying database for user...");
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          console.log("[AUTH] Database query returned user:", user ? "yes" : "no");
          if (!user) {
            return null;
          }

          console.log("[AUTH] Comparing passwords...");
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          console.log("[AUTH] Password comparison result:", isPasswordValid);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (err) {
          console.error("[AUTH] Error in authorize callback:", err);
          throw err;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("[AUTH] JWT callback called. User:", user ? "yes" : "no");
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("[AUTH] Session callback called. Token ID:", token?.id);
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
