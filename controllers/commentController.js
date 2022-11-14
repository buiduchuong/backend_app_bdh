const Comment = require("../models/commentsModel");

const commentController = {
    // them cmt
    addCmt: async (req, res) => {
        try {
            console.log(req.body)
            const newComment = new Comment(req.body);
            newComment.save();
            res.status(200).send("Them ok");

        } catch (error) {
            res.status(500).send("Loi them cmt");
        }
    },
    //get all cmt cua post
    getComment: async (req, res) => {
        try {

            const listComment = await Comment.find({'postId': req.body.postId });

            res.status(200).json(listComment);

        } catch (error) {
            res.status(500).send("err");
        }


    }
}

module.exports = commentController;