const MessageModel = require("../../models/messageModel");

const sendMessage = async (messageData) => {
  try {
    // const channelObject = await ChannelModel.findOne({
    //       _id: channelId,
    //     });
    
    //     const userObject = await UserModel.findOne({
    //       _id: userId,
    //     });
    
    //     if (!channelObject || ! userObject) {
    //       return null;
    //     }
    // const senderOfMessage = {
    //   _id: userId,
    //   username: userObject.username,
    //   email: userObject.email,
    // };
    // const channelOfMessage = {
    //   _id: channelId,
    //   name: channelObject.name,
    //   description: channelObject.description,
    // };
    // const messageData = {
    //   content: content,
    //   sender: senderOfMessage,
    //   channelId: channelOfMessage,
    // }
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
