import { connectDB } from "@/config/db"
import Comment from "@/models/Comment"
import Post from "@/models/Post"

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