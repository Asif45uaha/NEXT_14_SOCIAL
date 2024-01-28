import { connectDB } from "@/config/db";
import Post from "@/models/Post";
import User from "@/models/User";

export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const { query } = params;

        const searchedPosts = await Post.find({ text: { $regex: query, $options: "i" } }).sort({ createdAt: -1 }).populate({
            path: "createdBy",
            model: User
        })
        return new Response(JSON.stringify(searchedPosts), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}