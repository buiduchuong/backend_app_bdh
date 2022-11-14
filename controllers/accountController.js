const Account = require("../models/accountModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");


const AccountController = {

    //register
    accRegister: async (req, res) => {
        try {

            const body = req.body;
            const username = body.username;
            const checkUserTonTai = await Account.findOne({ username });
            if (checkUserTonTai) return res.status(400).json({ err: 'user name ton tai' });
            bcrypt.hash(body.password, 10, function (err, hash) {
                if (err) return res.status(401).json(err);
                const newAcc = new Account({ username: username, password: hash });

                const token = newAcc.generateAuthToken();
                const newUser = new User({ account: newAcc._id, name: body.name });
                newUser.save();
                res.status(200).json({ err: 'success' });

            });

        } catch (error) {
            res.status(500).json(error)
        }
    },
    //update
    updatePassword: async (req, res) => {
        try {

            const body = req.body;
            const id = body.id;

            bcrypt.hash(body.password, 10, async (err, hash) => {
                if (err) return res.status(401).json(err);
                const checkUserTonTai = await Account.findOneAndUpdate({ _id: id }, { $set: { password: hash } });
                res.status(200).json({ err: 'success' });

            });

        } catch (error) {
            res.status(500).json(error)
        }
    },
    // login
    login: async (req, res) => {
        try {
            const AuthHeader = req.headers["authorization"];

            // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzMzY2RkODkxZWU4YzAzNTU0YjExZGEiLCJpYXQiOjE2NjQzMzk0MTZ9.4_6kciNsUL80nnMrp_Y-gH3Zz9_DcuDWT57TBKhD7e0";
            if (!AuthHeader) {
                const username = req.body.username;
                const password = req.body.password;
                const checkUserTonTai = await Account.findOne({ username });
                if (!checkUserTonTai) return res.status(400).json('err');
                const match = await bcrypt.compare(password, checkUserTonTai.password);
                if (!match) return res.status(400).json('err');
                const token = checkUserTonTai.tokens[0];
                if (!token) {
                    checkUserTonTai.generateAuthToken();
                    return res.status(200).json(checkUserTonTai.tokens[0]);
                }
                return res.status(200).json(checkUserTonTai.tokens[0]);
            } else {
                const token = AuthHeader.split(" ")[1];
                var decoded = jwt.verify(token, process.env.KEY);
                // const userCurrent  = 
                return res.status(200).json(decoded);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
module.exports = AccountController;