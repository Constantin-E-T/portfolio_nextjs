import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./db"

const allowedUrls = process.env.NEXTAUTH_URLS ? 
  JSON.parse(process.env.NEXTAUTH_URLS) : 
  [];

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: ({ callback }: { callback: string }) => ({
          // Dynamically set the redirect_uri based on the request origin
          redirect_uri: callback,
          scope: "read:user user:email",
        })
      }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
  ],
  trustHost: true,
  callbacks: {
    async redirect({ url }) {
      // Get the origin of the request
      const origin = new URL(url).origin;
      
      if (url.startsWith('/')) {
        return `${origin}${url}`;
      } 
      
      if (allowedUrls.some((domain: string) => url.startsWith(domain))) {
        return url;
      }
      
      return origin;
    }
  }
})