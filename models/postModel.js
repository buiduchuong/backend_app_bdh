const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const postChema = new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    nameUser: {
        type: String,
        required: true
    },
    urlUser: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    likes: [{
        idUserLike: {
            type: String,
            required: true
        }
    }],
    comments: {
        type: Number
    },
    timeAgo: {
        type: String
    }


})

const Post = mongoose.model('Post', postChema);
module.exports = Post;