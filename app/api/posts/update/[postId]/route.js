import { connectDB } from "@/config/db";
import Post from "@/models/Post";

export const POST = async (req, { params }) => {
    try {
        await connectDB()
        const { postId } = params;
        const body = await req.json();
        const { text, img, userId } = body;
        const post = await Post.findById(postId);

        if (post?.createdBy?.toString() !== userId?.toString()) {
            return new Response(JSON.stringify({ error: "Unauthorized to Update Post" }), { status: 401 });
        }


        const updatedPost = await Post.findByIdAndUpdate(postId, { text, img }, { new: true })
        return new Response(JSON.stringify(updatedPost), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to Update Post" }), { status: 500 });
    }
}