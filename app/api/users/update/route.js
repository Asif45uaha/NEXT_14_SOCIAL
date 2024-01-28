import { connectDB } from "@/config/db";
import User from "@/models/User";

export const POST = async (req) => {
    try {
        await connectDB()
        const body = await req.json()

        const { username, email, profile, bio, _id } = body;

        const updatedUser = await User.findByIdAndUpdate(_id, { username, email, profile, bio }, { new: true })
        return new Response(JSON.stringify(updatedUser), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to Update profile", { status: 500 })
    }
}