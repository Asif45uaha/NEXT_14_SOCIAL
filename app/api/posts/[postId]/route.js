import { connectDB } from "@/config/db";
import Comment from "@/models/Comment";
import User from "@/models/User";

export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const { postId } = params
        const comments = await Comment.find({ postId }).populate({
            path: "commentedBy",
            model: User
        })

        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to fetch comments" }), { status: 500 });
    }
}



