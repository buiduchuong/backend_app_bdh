const { default: mongoose, model } = require("mongoose");

const jwt = require('jsonwebtoken');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});
AccountSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const acc = this;
    const token = jwt.sign({ _id: acc._id }, process.env.KEY);
    acc.tokens = acc.tokens.concat({ token });
    await acc.save();
    return token;
}

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;