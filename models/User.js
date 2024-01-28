import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: ""
    },
    profile: {
        type: String,
        default: ""
    },
    followers: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    },
    posts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: []
    }
})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User