const mongoose = require('mongoose');
const ChannelModel = require("../../models/channelModel");
const UserModel = require("../../models/userModel");

const createChannel = async (channelData) => {
  try {
    return await ChannelModel.create(channelData);
  } catch (err) {
    throw new Error(`Error while creating channel: ${err.message}`);
  }
};

const findByChannelname = async (name) => {
  try {
    return await ChannelModel.findOne({ name: name});
  } catch (err) {
    throw new Error(`Error while finding channel by name: ${err.message}`);
  }
};

const joinChannel = async (channelId, userId) => {
  try {
    const channelObject = await ChannelModel.findOne({
      _id: channelId,
    });

    const userObject = await UserModel.findOne({
      _id: userId,
    });

    if (!channelObject || ! userObject) {
      return null;
    }
    channelObject.members.push(userObject);

    userObject.joinedChannels.push(channelObject);
    
    const joinChannel = await channelObject.save();
    const updateUser = await userObject.save();
    return joinChannel;
  } catch (err) {
    throw new Error(`Error while joining channel: ${err.message}`);
  }
};

const getChannelDetails = async (channelId) => {
  try {
    const channelObject = await ChannelModel.findOne({
      _id: channelId,
    });

    return channelObject;
  } catch (err) {
    throw new Error(`Error while fetching channel: ${err.message}`);
  }
};

const getAllChannels = async () => {
  try {
    const channels = await ChannelModel.find();
    return channels;
  } catch (err) {
    throw new Error(`Error while fetching channels: ${err.message}`);
  }
};
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
  createChannel,
  joinChannel,
  getChannelDetails,
  getAllChannels,
  findByChannelname,
  sendMessage,
  getAllMessages,
};
