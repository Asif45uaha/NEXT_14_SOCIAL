import { connectDB } from "@/config/db";
import User from "@/models/User";

export const POST = async (req, { params }) => {
    try {
        await connectDB()
        const { id } = params

        const body = await req.json()
        const { userId } = body

        const userToModify = await User.findById(id)
        const currUser = await User.findById(userId)
        if (id === userId)
            return new Response(JSON.stringify({ error: "You cannot follow/unfollow yourself" }), { status: 400 });


        const isFollowing = currUser.following.includes(id)

        if (isFollowing) {
            //unfollow
            await User.findByIdAndUpdate(id, { $pull: { followers: userId } });
            await User.findByIdAndUpdate(userId, { $pull: { following: id } });
            return new Response(JSON.stringify({ message: "Unfollowed" }), { status: 200 })
        }
        else {
            //follow
            await User.findByIdAndUpdate(id, { $push: { followers: userId } });
            await User.findByIdAndUpdate(userId, { $push: { following: id } });
            return new Response(JSON.stringify({ message: "followed" }), { status: 200 })
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })

    }
}