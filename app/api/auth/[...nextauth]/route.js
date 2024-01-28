import { connectDB } from '@/config/db'
import User from '@/models/User'
import { compare } from 'bcryptjs'
import nextAuth from 'next-auth'
import credentialsProvider from 'next-auth/providers/credentials'

const handler = nextAuth({
    providers: [
        credentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid Credentials")
                }
                await connectDB()

                const user = await User.findOne({ email: credentials?.email })

                if (!user || !user.password) {
                    throw new Error("User Not Found")
                }

                const isMatch = await compare(credentials?.password, user.password)

                if (!isMatch) {
                    throw new Error("Invalid Password")
                }
                return user;
            }
        })],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session }) {
            const mongoUser = await User.findOne({ email: session?.user?.email })
            session.user.id = mongoUser._id.toString()

            session.user = { ...session, ...mongoUser._doc }

            return session
        }
    }
})

export { handler as GET, handler as POST }