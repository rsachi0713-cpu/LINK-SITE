import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] Missing credentials");
          return null;
        }

        try {
          // Use prisma directly
          const emailTrimmed = credentials.email.toLowerCase().trim();
          console.log("[AUTH] Attempting login for:", emailTrimmed);
          
          let user;
          try {
            // Transaction ekak use kalama Hyperdrive eken cache karanne naha, kelinma DB eken gannawa
            user = await prisma.$transaction(async (tx) => {
              return await tx.user.findUnique({
                where: { email: emailTrimmed },
              });
            });
            console.log("[AUTH] User lookup success:", user ? "Found" : "Not Found");
          } catch (dbErr: any) {
            console.error("[AUTH] Database lookup error:", dbErr);
            throw new Error("DB_ERROR: " + String(dbErr));
          }

          if (!user || !user.password) {
            console.log("[AUTH] User not found or no password:", emailTrimmed);
            return null;
          }

          let isPasswordValid = false;
          try {
            console.log("[AUTH] Comparing password for:", emailTrimmed);
            isPasswordValid = await comparePassword(
              credentials.password,
              user.password
            );
            console.log("[AUTH] Password valid:", isPasswordValid);
          } catch (hashErr: any) {
            console.error("[AUTH] Hash comparison error:", hashErr);
            throw new Error("HASH_ERROR: " + String(hashErr));
          }

          if (!isPasswordValid) {
            console.log("[AUTH] Invalid password for:", emailTrimmed);
            return null;
          }

          console.log("[AUTH] Login successful for:", emailTrimmed);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (err) {
          console.error("[AUTH] Error in authorize:", err);
          throw err;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-rekonise-clone-key-12345",
};
