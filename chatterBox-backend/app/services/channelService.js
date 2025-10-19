const channelRepository = require("../database/repositories/channelRepository");
const messageRepository = require("../database/repositories/messageRepository");
const expressAsyncHandler = require("express-async-handler");

const createChannel = expressAsyncHandler(async (req, res) => {
  const { name, description, createdBy} = req.body;
  try {
    const existingChannel = await channelRepository.findByChannelname(name);
    if (existingChannel) {
      res.status(400);
      throw new Error("Channel exists");
    }

    const newChannel = await channelRepository.createChannel({
      name: name,
      description: description,
      createdBy: createdBy,
    });

    if (newChannel) {
      res.status(201).json({
        //message: "Channel successfully created",
      });
    } else {
      res.status(400).json({
        message: "Unable to create channel.",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: `Error in creating channel`,
      error: err.message,
    });
  }
});

const joinChannel = expressAsyncHandler(async (req, res) => {
  try {
    const { channelId, userId } = req.body;
    // console.log("inside join channel");
    // console.log("Channel id is=>" + channelId);
    // console.log("User id is:>"+ userId);
    const result = await channelRepository.
    joinChannel(channelId, userId);

    if (result) {
      res.status(200).json({
        message: "User successfully joined the channel",
      });
    } else {
      res.status(400);
      throw new Error("User failed to join channel");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error joining the channel.",
      error: err.message,
    });
  }
});

const getChannelDetails = expressAsyncHandler(async (req, res) => {
  try {
    const channelId = req.params.id;
    // console.log("channel_id is=>"+ channelId);
    const result = await channelRepository.getChannelDetails(channelId);

    if (result) {
      res.status(200).json({
        data: result,
        message: "Successfully fetched channel details.",
      });
    } else {
      res.status(204);
      throw new Error(
        `Not able to find the channel based on the channel id : ${channelId}`
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching channel details.",
      error: err.message,
    });
  }
});

const getAllChannels = expressAsyncHandler(async (req, res) => {
  try {
    const result = await channelRepository.getAllChannels();
    console.log(result);
    res.status(200).json({
      data: result,
      message: "Sucessfully fetched all channels",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching all channel details.",
      error: err.message,
    });
  }
});

const sendMessage = expressAsyncHandler(async (req, res) => {
  try {
    const { content, userId, channelId } = req.body;
    // console.log("content is:>" +content);
    // console.log("Channel id to send message is::"+ channelId);
    // console.log("Sender id is:"+ userId);
    const result = await messageRepository.sendMessage({
          content: content,
          sender: userId,
          channelId: channelId,
        });
    if (result) {
      res.status(201).json({
        message: "Message sent successfully",
      });
    } else {
      res.status(400);
      throw new Error(`Message sending failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error sending message",
      error: err.message,
    });
  }
});

const getAllMessages = expressAsyncHandler(async (req, res) => {
  try {
    const { channelId1 } = req.body;
    const { channelId } = req.params.id;
    console.log("Channel id1 is=>"+ channelId1);
     console.log("Channel id is=>"+ channelId);
    const result = await messageRepository.getAllMessages();
    //console.log(result);
    res.status(200).json({
      data: result,
      message: "Successfully fetched all messages.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching messages",
      error: err.message,
    });
  }
});

module.exports = {
  createChannel,
  joinChannel,
  getChannelDetails,
  getAllChannels,
  sendMessage,
  getAllMessages,
};
