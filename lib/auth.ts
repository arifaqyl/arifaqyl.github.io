import NextAuth, { type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import { env } from "@/lib/env";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      username?: string;
      isAdmin?: boolean;
    };
  }
}

const githubProvider =
  env.githubConfigured
    ? [
        GitHub({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!
        })
      ]
    : [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: githubProvider,
  callbacks: {
    async jwt({ token, profile }) {
      if (profile && "login" in profile && typeof profile.login === "string") {
        token.username = profile.login;
      }
      const username = typeof token.username === "string" ? token.username.toLowerCase() : "";
      token.isAdmin = env.adminLogins.includes(username);
      return token;
    },
    async session({ session, token }) {
      session.user.username = typeof token.username === "string" ? token.username : undefined;
      session.user.isAdmin = Boolean(token.isAdmin);
      return session;
    }
  }
});

export async function getAdminSession() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return null;
  }
  return session;
}

