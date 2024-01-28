import { connectDB } from "@/config/db";
import Post from "@/models/Post";

export const GET = async (req) => {
    try {
        await connectDB()

        const posts = await Post.find({}).sort({ createdAt: -1 }).populate({
            path: "createdBy",
            model: "User"
        }).exec()

        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch Posts", { status: 500 })
    }
}