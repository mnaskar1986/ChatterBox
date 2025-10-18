const mongoose = require('mongoose');

// const userSchema = mongoose.Schema(
//     {
//         _id :{
//             type: String,
//             required: true,
//         },
//         username: {
//             type: String,
//             required: true,
//         }
//     }
// );

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
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
        createdBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "UserModel",  
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