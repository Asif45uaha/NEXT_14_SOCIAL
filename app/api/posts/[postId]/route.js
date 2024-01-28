import { connectDB } from "@/config/db";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import User from "@/models/User";


export const POST = async (req, { params }) => {
    try {
        await connectDB()

        const body = await req.json()
        const { postId } = params
        const { text, commentedBy } = body

        if (!text) {
            return new Response("Text is required", { status: 400 });
        }

        const comment = new Comment({
            commentedBy, text, postId
        })

        await comment.save()
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } })
        return new Response(JSON.stringify(comment), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to create a comment", { status: 500 });
    }
}

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

export const DELETE = async (req, { params }) => {
    try {
        const { postId } = params;
        const body = await req.json()

        const { userId } = body;

        const post = await Post.findById(postId);

        if (post.createdBy.toString() !== userId.toString()) {
            return new Response(JSON.stringify({ error: "Unauthorized to Delete Post" }), { status: 401 });
        }

        const deletedRes = await Post.findByIdAndDelete(postId);
        await User.findByIdAndUpdate(userId, { $pull: { posts: postId } }, { new: true });
        await Post.findByIdAndUpdate(postId, { $pull: { comments: postId } }, { new: true })
        return new Response(JSON.stringify(deletedRes), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
    }
}


export const PUT = async (req, { params }) => {
    try {
        await connectDB()
        const { postId } = params;
        const body = await req.json();
        const { text, img, userId } = body;
        const post = await Post.findById(postId);

        if (post.createdBy.toString() !== userId) {
            return new Response(JSON.stringify({ error: "Unauthorized to Update Post" }), { status: 401 });
        }


        const updatedPost = await Post.findByIdAndUpdate(postId, { text, img }, { new: true })
        return new Response(JSON.stringify(updatedPost), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to Update Post" }), { status: 500 });
    }
}