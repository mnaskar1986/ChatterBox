const mongoose = require('mongoose')

const chnnelSchema = mongoose.Schema(
    {
        _id:{
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }
);

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        joinedChannels: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChannelModel" }],
        createdTs: {
            type: Date,
            default: new Date(),
        },
        updatedTs: {
            type: Date,
            default: new Date(),
        }
    }
);

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;