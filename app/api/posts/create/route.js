import { connectDB } from "@/config/db";
import Post from "@/models/Post";
import User from "@/models/User";

export const POST = async (req) => {
    try {
        await connectDB()
        const body = await req.json();

        const { createdBy, text, img } = body

        const post = new Post({
            createdBy,
            text,
            img
        })
        await post.save()
        await User.findByIdAndUpdate(createdBy, { $addToSet: { posts: post._id } }, { new: true })

        return new Response(JSON.stringify(post), { status: 201 })


    } catch (error) {
        console.log(error);
        return new Response("Error in creating the Post", { status: 500 })
    }
}