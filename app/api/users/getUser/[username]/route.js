import { connectDB } from "@/config/db";
import Post from "@/models/Post";
import User from "@/models/User";


export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const { username } = params

        const user = await User.findOne({ username: { $regex: username, $options: "i" } }).populate({
            path: "posts",
            model: Post
        })

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
    }
}