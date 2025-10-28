const MessageModel = require("../../models/messageModel");
const UserModel = require("../../models/userModel");

const sendMessage = async (messageData) => {
  try {
    // const userObject = await UserModel.findOne({
    //   _id: userId,
    // });
    // if (! userObject) {
    //       return null;
    //     }
    const newMessage = await MessageModel.create(messageData);
    return newMessage;
  } catch (err) {
    throw new Error(`Error while sending message: ${err.message}`);
  }
};

const getAllMessages = async (channelId) => {
  try {
    const messages = await MessageModel.find({ channelId: channelId });
    return messages;
  } catch (err) {
    throw new Error(`Error while fetching messages: ${err.message}`);
  }
};

module.exports = {
  sendMessage,
  getAllMessages,
};
