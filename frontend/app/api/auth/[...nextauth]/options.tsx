import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
    pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/error", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
        newUser: "/" // If set, new users will be directed here on first sign in
    },
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
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "username 🦹"},
                password: {label: "Password", type: "password", placeholder: "password 😼"}
            },
            async authorize(credentials) {
                return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(credentials)
                }).then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                }).then((data) => {
                    console.log(data)
                    return data
                }).catch((err) => {
                    console.log(err)
                    return null
                })

                // Hard coded for simplicity and proof of concept
                // const user = {id: "1", name: "admin", email: "jsmith@example.com", password: "admin", role: "user"}
                //
                // if (credentials?.username === user.name && credentials?.password === user.password) {
                //     return user
                // } else {
                //     return null
                // }
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