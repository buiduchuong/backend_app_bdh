const User = require("../models/userModel");

const userController = {
    update: async (req, res) => {

        try {
            const id = req.body._id;
            console.log(req.body);
            const user = await User.findOneAndUpdate({ _id: id }, { $set: req.body });
            await user.save();
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    get: async (req, res) => {
        try {
            const data = await User.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getUserbyID: async (req, res) => {
        try {
            const data = await User.findById(req.body.id);
            // console.log(data);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    ,
    getOneUser: async (req, res) => {
        const account = req.body;
        try {
            const data = await User.findOne(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    ,
    getOneUserEmail: async (req, res, next) => {
        const email = req.body.email;
        try {
            const data = await User.findOne({ "email": email });
            if (data != null) {
                next()
            } else {
                res.status(204).json(data);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = userController;