import { connectDB } from "@/config/db"
import User from "@/models/User"
import bcrypt from 'bcryptjs'


export const POST = async (req) => {
    try {
        await connectDB()
        const body = await req.json()
        const { username, email, } = body
        let { password } = body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return new Response("User already Exists", { status: 400 })
        }
        password = await bcrypt.hash(password, 10)

        const user = new User({ username, email, password })
        await user.save()
        return new Response(JSON.stringify(user), { status: 201 })

    } catch (error) {
        console.log(error);
        return new Response("Error in creating a user", { status: 500 })
    }
}