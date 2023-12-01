import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            }
          }),
        CredentialsProvider({name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "username 🦹" },
              password: { label: "Password", type: "password", placeholder: "password 😼"}
            },
            async authorize(credentials) {
              // Hard coded for simplicity and proof of concept
              const user = { id: "1", name: "admin", email: "jsmith@example.com", password: "admin", role: "user"}

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        //async jwt({ token, user }) {
          //  if (user) token = user
          //  return token
        //},
        async session({session, token}) {
            if (session?.user) session.user = token
            return session
        }
    }
}