const Post = require("../models/postModel");

const postController = {
    //add
    addPost: async (req, res) => {
        try {
            console.log(req.body);
            const newPost = new Post(req.body);
            const savePost = await newPost.save();
            res.status(200).json({ err: "success" });

        } catch (error) {
            res.status(500).json(error);
        }
    },
    //delete
    deletePost: async (req, res) => {
        try {
            const id = req.body.id;
            const postCurrent = await Post.findOneAndDelete(id)
            const savePost = postCurrent.save()
            res.status(200).json({ err: "success" })

        } catch (error) {
            res.status(500).json(error)
        }
    },
    //update
    update: async (req, res) => {
        try {
            const id = req.body.id;
            const postCurrent = await Post.findByIdAndUpdate(id, req.body);
            const savePost = postCurrent.save();
            res.status(200).json({ err: "success" });

        } catch (error) {
            res.status(500).json(error)
        }
    },
    //update cmt
    updateCmt: async (req, res) => {
        try {
            const id = req.body.id;
            const postCurrent = await Post.findByIdAndUpdate(id, { 'comments': req.body.cmt });
            const savePost = postCurrent.save();
            res.status(200).json({ err: "success" });

        } catch (error) {
            res.status(500).json(error);
        }
    },
    //update like
    updateLike: async (req, res) => {
        try {
            const id = req.body.id;
            const idUserLiked = req.body.idUserLike;
            const postCurrent = await Post.findById(id);
            // if (!postCurrent.likes.find()) {
            const idU = postCurrent.likes.find(({ idUserLike }) => idUserLike === idUserLiked);
            if (idU) {
                postCurrent.collection.updateMany({},
                    {
                        $pull: {
                            likes: {
                                idUserLike: idUserLiked
                            }
                        }
                    })
                return res.status(201).json({ err: "dislike" });
            }

            postCurrent.likes = postCurrent.likes.concat({ idUserLike: idUserLiked });
            postCurrent.save();
            return res.status(200).json({ err: "success" });

        } catch (error) {
            res.status(500).json(error);
        }
    },
    //kiem tra like
    checkLike: async (req, res) => {
        try {
            const id = req.body.id;
            const idUserLiked = req.body.idUserLike;
            const postCurrent = await Post.findById(id);
            // if (!postCurrent.likes.find()) {
            const idU = postCurrent.likes.find(({ idUserLike }) => idUserLike === idUserLiked);
            if (idU) { return res.status(200).send('co roi'); }
            return res.status(201).send('chua co');
        } catch (F) {
            res.status(500);
        }
    },
    //  getAlldata
    getAll: async (req, res) => {
        try {
            var a = [];
            const postCurrent = await Post.find().sort({ _id: -1 });
            // const savePost = postCurrent.save()
            var a = postCurrent;
            // console.log(a[1].likes.length);
            res.status(200).json(postCurrent);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get1byid
    getOne: async (req, res) => {
        try {
            const id = req.body.id;
            const postCurrent = await Post.findById(id);
            // const savePost = postCurrent.save();
            res.status(200).json(postCurrent);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllPostUser: async (req, res) => {
        try {
            const idUser = req.body.id;
            const postCurrent = await Post.find({ user: idUser }).sort({ _id: -1 });
            // const savePost = postCurrent.save()
            var a = postCurrent;
            // console.log(a[1].likes.length);
            res.status(200).json(postCurrent);

        } catch (error) {
            res.status(500).json(error);
        }
    },
}



module.exports = postController;