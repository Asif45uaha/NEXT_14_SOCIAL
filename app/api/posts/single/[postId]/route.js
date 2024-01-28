import Comment from "@/models/Comment"
import Post from "@/models/Post"
import User from "@/models/User"

export const GET = async (req, { params }) => {
    try {
        const { postId } = params
        const post = await Post.findById(postId).populate({
            path: "comments",
            model: Comment,
            populate: {
                path: "commentedBy",
                model: User
            }
        }).exec()

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
    }
}