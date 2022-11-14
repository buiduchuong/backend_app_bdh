const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = {
    name: {
        type: String,
        required: true
    },
    account: {
        type: ObjectId,
        required: true
    },
    avtURL: {
        type: String,
    },
    biaURL: {
        type: String,
    },
    birthday: {
        type: Date
    },
    code: {
        type: String
    }
    ,
    email: {
        type: String
    }

}

const User = mongoose.model('User', userSchema);
module.exports = User;