import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./db"

// Parse the NEXTAUTH_URLS from environment variable
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
        params: {
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/github"
        }
      }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
  ],
  trustHost: true,
  callbacks: {
    async redirect({ url, baseUrl }) {
      const allowedDomains = [process.env.NEXTAUTH_URL, ...allowedUrls];
      
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      } 
      
      if (allowedDomains.some(domain => url.startsWith(domain))) {
        return url;
      }
      
      return baseUrl;
    }
  }
})