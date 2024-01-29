import { connectDB } from "@/config/db";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import User from "@/models/User";
export const POST = async (req, { params }) => {
    try {
        await connectDB()
        const { postId } = params;
        const body = await req.json()

        const { userId } = body;

        const post = await Post.findById(postId);

        if (post?.createdBy?.toString() !== userId.toString()) {
            return new Response(JSON.stringify({ error: "Unauthorized to Delete Post" }), { status: 401 });
        }

        await Post.findByIdAndDelete(postId);
        await User.findByIdAndUpdate(userId, { $pull: { posts: postId } }, { new: true });
        // delete all comments of the post
        await Comment.deleteMany({ postId });
        return new Response(JSON.stringify({ message: "Post has been Deleted" }), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
    }
}
