import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import Email from "@auth/core/providers/nodemailer";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { type DefaultSession } from "next-auth";

// Extend the session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    emailVerified?: Date;
    role?: string;
  }
}

// Schema for credentials validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Email Sign-in (Magic Links)
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    // Google OAuth
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Request refresh token for long-term access
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // Credentials (Username/Password)
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate credentials format
          const parsedCredentials = loginSchema.safeParse(credentials);

          if (!parsedCredentials.success) {
            console.error(
              "Invalid credentials format:",
              parsedCredentials.error
            );
            return null;
          }

          const { email, password } = parsedCredentials.data; // Look up user in database
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            console.error("User not found or password not set");
            return null;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            console.error("Invalid password");
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },

  session: {
    strategy: "jwt", // Use JWT for Edge compatibility
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        console.log(
          "JWT callback - user data:",
          JSON.stringify({
            id: user.id,
            email: user.email,
            role: user.role,
          })
        );

        // Add the user ID to the token for easy access
        token.id = user.id;

        // Add the user role if available
        if (user.role) {
          token.role = user.role;
          console.log(`Setting role in token: ${user.role}`);
        }

        // Store provider info if available
        if (account.provider) {
          token.provider = account.provider;
        }

        // For OAuth accounts, store additional info
        if (
          account.provider !== "credentials" &&
          account.provider !== "email"
        ) {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.accessTokenExpires = account.expires_at;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log(
        "Session callback - token data:",
        JSON.stringify({
          sub: token.sub,
          role: token.role,
        })
      );

      // Add user id to session
      if (token && session.user) {
        session.user.id = token.sub as string;

        // Add user role if available
        if (token.role) {
          session.user.role = token.role as string;
          console.log(`Setting role in session: ${token.role}`);
        }
      }

      console.log(
        "Session after modification:",
        JSON.stringify({
          userId: session.user?.id,
          userRole: session.user?.role,
        })
      );

      return session;
    },
    async signIn({ user, account }) {
      // Allow all sign-ins by default
      const isAllowedToSignIn = true;

      // Auto-verify email for email (magic link) users
      if (account?.provider === "email") {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          });
        } catch (error) {
          console.error("Failed to verify email:", error);
        }
      }

      return isAllowedToSignIn;
    },
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      if (account) {
        console.log(`User signed in: ${user.email} via ${account.provider}`);

        // If it's a new user who signed in via OAuth
        if (isNewUser && account.provider !== "credentials") {
          console.log("New user registered via OAuth");
        }
      }
    },

    async createUser({ user }) {
      console.log(`New user created: ${user.email}`);
    },
  },

  debug: process.env.NODE_ENV === "development",
});
