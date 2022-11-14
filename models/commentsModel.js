const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const commentSchema = new Schema(
    {
        postId: {
            type: ObjectId,
            required: true
        },
        idUserComment: {
            type: ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        urlAvt: {
            type: String,
            required: true,
        },
    })

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;