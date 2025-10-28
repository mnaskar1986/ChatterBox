const mongoose = require('mongoose');
const { userModel } = require('./userModel');

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
        }
    }
);

const messageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: Object, 
        ref: 'User', 
        required: true
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdTs: {
        type: Date,
        default: Date.now,
    }
});

const MessageModel = mongoose.model('message', messageSchema);

module.exports = MessageModel;