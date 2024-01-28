import { connectDB } from "@/config/db";
import Post from "@/models/Post";

export const POST = async (req, { params }) => {
    try {
        await connectDB()
        const body = await req.json()
        const { userId } = body
        const { postId } = params;

        let post = await Post.findById(postId)
        const userLikedPost = post.likes.includes(userId)
        if (userLikedPost) {
            await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true })
            return new Response(JSON.stringify({ message: "Unliked the Post" }), { status: 200 })

        }
        else {
            await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } }, { new: true })
            return new Response(JSON.stringify({ message: "Liked the Post" }), { status: 200 })
        }


    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 })
    }
}