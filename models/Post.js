import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
    },
    img: {
        type: String,
    },
    likes:
    {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment",
        default: []
    }
},
    { timestamps: true })

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
export default Post