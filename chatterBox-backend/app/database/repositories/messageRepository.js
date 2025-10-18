const MessageModel = require("../../models/messageModel");

const sendMessage = async (messageData) => {
  try {
    const newMessage = await MessageModel.create(messageData);
    return newMessage;
  } catch (err) {
    throw new Error(`Error while sending message: ${err.message}`);
  }
};

const getAllMessages = async (channelId) => {
  try {
    const messages = await MessageModel.find();
    return messages;
  } catch (err) {
    throw new Error(`Error while fetching messages: ${err.message}`);
  }
};

module.exports = {
  sendMessage,
  getAllMessages,
};
