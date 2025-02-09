// app/utils/auth.ts

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./db"

const isDevelopment = process.env.NODE_ENV === 'development'
const baseUrl = isDevelopment ? 'http://localhost:3000' : 'https://conn.digital'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: {
        params: {
          redirect_uri: `${baseUrl}/api/auth/callback/github`
        }
      }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          redirect_uri: `${baseUrl}/api/auth/callback/google`
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user id to the token right after signin
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Add the user id to the session
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !isDevelopment,
        domain: isDevelopment ? 'localhost' : '.conn.digital'
      }
    },
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !isDevelopment,
        domain: isDevelopment ? 'localhost' : '.conn.digital'
      }
    }
  },
  trustHost: true,
  debug: isDevelopment,
  ...(isDevelopment ? {} : { trustHost: true })
})