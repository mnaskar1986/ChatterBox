const mongoose = require('mongoose')
const { channelModel } = require('./channelModel');
const bcrypt = require("bcryptjs");

const chnnelSchema = mongoose.Schema(
    {
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
        joinedChannels: [{
            type: Object,
        }],
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;