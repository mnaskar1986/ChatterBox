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

const chnnelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        members: [{
            type: Object,
            required: true,
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
        },
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

const ChannelModel = mongoose.model('channel', chnnelSchema);

module.exports = ChannelModel;