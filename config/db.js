import mongoose from "mongoose";

let isConnected = false

export const connectDB = async () => {
    try {
        if (isConnected) {
            console.log("MongoDB is already connected");
            return
        }
        await mongoose.connect(process.env.MONGO_URI)
        isConnected = true;
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.log("Failed to connect to DB", error);
    }
}