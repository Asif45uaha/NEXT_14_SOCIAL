import { connectDB } from "@/config/db";
import Comment from "@/models/Comment";
import Post from "@/models/Post";

export const POST = async (req, { params }) => {
    try {
        await connectDB()
        const { commentId } = params;
        const body = await req.json()

        const { userId } = body;

        const comment = await Comment.findById(commentId);

        if (comment?.commentedBy.toString() !== userId.toString()) {
            return new Response(JSON.stringify({ error: "You are not authorized to delete this comment" }), { status: 401 }); // Unauthorized access to delete the comment
        }

        await comment.deleteOne({ _id: commentId })
        await Post.findByIdAndUpdate(comment.postId, { $pull: { comments: commentId } }, { new: true });
        return new Response(JSON.stringify({ message: "Comment deleted successfully" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to delete a comment" }), { status: 500 });
    }
}