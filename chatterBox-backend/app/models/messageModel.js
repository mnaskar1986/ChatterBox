const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: Object,
        required: true,
    },
    channelId: {
        type: Object,
        required: true,
    },
    createdTs: {
        type: Date,
        default: new Date(),
    }
});

const MessageModel = mongoose.model('message', messageSchema);

module.exports = MessageModel;