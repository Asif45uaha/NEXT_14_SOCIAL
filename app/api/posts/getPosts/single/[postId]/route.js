import { connectDB } from "@/config/db";
import Post from "@/models/Post";

export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const { postId } = params

        const post = await Post.findById(postId)

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to get a posts")
    }
}