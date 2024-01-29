import { connectDB } from "@/config/db";
import Comment from "@/models/Comment";



export const POST = async (req, { params }) => {
    try {
        await connectDB()
        const { commentId } = params;
        const body = await req.json()

        const { userId, text } = body;

        const comment = await Comment.findById(commentId);

        if (comment?.commentedBy.toString() !== userId.toString()) {
            return new Response(JSON.stringify({ error: "You are not authorized to Update this comment" }), { status: 401 }); // Unauthorized access to delete the comment
        }

        await Comment.findByIdAndUpdate(commentId, { text })

        return new Response(JSON.stringify({ message: "Comment Updated successfully" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to Update a comment" }), { status: 500 });
    }
}