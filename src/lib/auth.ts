import { NextAuthOptions, getServerSession } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { nanoid } from "nanoid"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@/lib/db/db"
import { generateVerificationToken } from "./tokens"
import { sendVerificationEmail } from "./mail"
import { getUserById } from "../../data/user"

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

                if (!dbUser.emailVerified) {
                    const verificationToken = await generateVerificationToken(dbUser.email as string)

                    await sendVerificationEmail(
                        verificationToken.email,
                        verificationToken.token,
                    )

                    throw new Error("User not verified, new confirmation email sent!")
                }

                const passwordMatch = await bcrypt.compare(credentials.password, dbUser.hashedPassword)

                if (!passwordMatch) {
                    throw new Error("Incorrect Email or Password")
                }

                return dbUser
            }
        })
    ],
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                const existingUser = await prisma.user.findFirst({
                    where: { email: profile?.email },
                });

                if (existingUser) {
                    const checkIfExistsInAccount = await prisma.account.findFirst({
                        where: {
                            provider: "google",
                            providerAccountId: user?.id?.toString(),
                        },
                    });

                    // Check if the user is already linked with a Google account
                    if (!checkIfExistsInAccount) {
                        // Link the Google account with the existing user
                        await prisma.account.create({
                            data: {
                                userId: existingUser.id,
                                type: "oauth",
                                provider: "google",
                                providerAccountId: user?.id?.toString(),
                            },
                        });
                    }
                } else {
                    // User doesn't exist, create a new user
                    // You can add logic here to create the user as needed
                }
            }

            return true;
        },
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.username = token.username
                session.user.image = token.picture
                session.user.role = token.role
                session.user.name = token.name
                session.user.birthday = token.birthday
                session.user.isBanned = token.isBanned
                session.user.numberOfViolations = token.numberOfViolations
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
                birthday: dbUser.birthday,
                isBanned: dbUser.isBanned,
                numberOfViolations: dbUser.numberOfViolations,
            }
        },
        // redirect() {
        //     return '/discussion'
        // }, ADD REDIRECT FOR FUTURE FEATURES SUCH AS WHEN LOGGING IN MADDIRECT SA PAGE KUNG NASAN TALAGA YUNG USER HINDI SA STATIC NA /discussion. need further research
    }
}

export const getAuthSession = () => getServerSession(authOptions)

// import NextAuth from "next-auth"
// import authConfig from "./auth.config"
// import { Role } from "@prisma/client"
// import { getUserById } from "./data/user";
// import { getAccountByUserId } from "./data/account";
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import prisma from "./src/lib/db/db";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   callbacks: {
//     async signIn({ user, account }) {

//       const existingUser = await getUserById(user.id as string);

//       if (!existingUser?.emailVerified || !existingUser?.hashedPassword) return true;

//       return true;
//     },
//     async session({ token, session }) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//       }

//       if (token.role && session.user) {
//         session.user.role = token.role as Role;
//       }

//       if (session.user) {
//         session.user.name = token.name;
//         session.user.email = token.email as string;
//         session.user.image = token.picture;
//         session.user.role = token.role;
//         session.user.numberOfViolations = token.numberOfViolations as number;
//         session.user.isBanned = token.isBanned as boolean;
//       }

//       return session;
//     },
//     async jwt({ token }) {
//       if (!token.sub) return token;

//       const existingUser = await getUserById(token.sub);

//       if (!existingUser) return token;

//       const existingAccount = await getAccountByUserId(
//         existingUser.id
//       );

//       token.name = existingUser.name;
//       token.email = existingUser.email;
//       token.role = existingUser.role;
//       token.picture = existingUser.image;
//       token.numberOfViolations = existingUser.numberOfViolations;
//       token.isBanned = existingUser.isBanned;

//       return token;
//     }
//   },
//   //@ts-ignore
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   ...authConfig
// })