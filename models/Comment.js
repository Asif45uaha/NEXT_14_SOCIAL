import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment