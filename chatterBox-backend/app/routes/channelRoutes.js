const express = require("express");
const { auth } = require("../middleware/authenticationHandler");
const channelRouter = express.Router();

const {
  createChannel,
  getChannelDetails,
  getAllChannels,
  joinChannel,
  sendMessage,
  //getAllMessages,
} = require("../services/channelService");

channelRouter.route("/:id").put(auth, joinChannel);
channelRouter.route("/:id").get(getChannelDetails);
channelRouter.route("/").get(auth, getAllChannels);
channelRouter.route("/").post(auth, createChannel);

channelRouter.route("/:id/message").post(auth, sendMessage);
//channelRouter.route("/:id").get(getAllMessages);


module.exports = channelRouter;
