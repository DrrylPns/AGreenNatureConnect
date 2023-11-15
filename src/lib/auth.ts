import { NextAuthOptions, getServerSession } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { nanoid } from "nanoid"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./db/db"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Enter a valid email or password")
                }

                const dbUser = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                })

                if (!dbUser || !dbUser?.hashedPassword) {
                    throw new Error("No user found")
                }

                const passwordMatch = await bcrypt.compare(credentials.password, dbUser.hashedPassword)

                if (!passwordMatch) {
                    throw new Error("Incorrect Password")
                }

                return dbUser
            }
        })
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.username = token.username
                session.user.image = token.picture
                session.user.role = token.role
                session.user.name = token.name
                session.user.birthday = token.birthday
            }

            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: token.email
                },
            })

            if (!dbUser) {
                token.id = user!.id
                return token
            }

            if (!dbUser.username) {
                await prisma.user.update({
                    where: {
                        id: dbUser.id
                    },
                    data: {
                        username: nanoid(10),
                    },
                })
            }

            return {
                id: dbUser.id,
                email: dbUser.email,
                username: dbUser.username,
                picture: dbUser.image,
                role: dbUser.role,
                name: dbUser.name,
                birthday: dbUser.birthday
            }
        },
        // redirect() {
        //     return '/discussion'
        // }, ADD REDIRECT FOR FUTURE FEATURES SUCH AS WHEN LOGGING IN MADDIRECT SA PAGE KUNG NASAN TALAGA YUNG USER HINDI SA STATIC NA /discussion. need further research
    }
}

export const getAuthSession = () => getServerSession(authOptions)