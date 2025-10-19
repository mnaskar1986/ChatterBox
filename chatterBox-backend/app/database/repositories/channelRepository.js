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

    let membersInChannel = {};
    membersInChannel = channelObject.members;
    const memberAlreadyInChannel = membersInChannel.find(member => member._id === userId);
    if(!memberAlreadyInChannel) {
      const newUser = {
        _id : userId,
        username: userObject.username,
        email: userObject.email,
      };
      membersInChannel.push(newUser);
    }
    channelObject.members= membersInChannel;

    let channelsJoinedByUser = {};
    channelsJoinedByUser = userObject.joinedChannels;
    const channelAlreadyJoinedByUser = channelsJoinedByUser.find(channel => channel._id === channelId);
    if(!channelAlreadyJoinedByUser){
      const newChannel = {
        _id : channelId,
        name: channelObject.name,
        description: channelObject.description,
      };
      channelsJoinedByUser.push(newChannel);
    }
    userObject.joinedChannels= channelsJoinedByUser;

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


module.exports = {
  createChannel,
  joinChannel,
  getChannelDetails,
  getAllChannels,
  findByChannelname,
  sendMessage,
};
