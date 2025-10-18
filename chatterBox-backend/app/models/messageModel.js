const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdTs: {
        type: Date,
        default: new Date(),
    }
});

const MessageModel = mongoose.model('message', messageSchema);

module.exports = MessageModel;