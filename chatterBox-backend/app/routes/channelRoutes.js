const express = require("express");
const { auth } = require("../middleware/authenticationHandler");
const channelRouter = express.Router();

const {
  createChannel,
  editChannel,
  deleteChannel,
  getChannelDetails,
  getAllChannels,
  joinChannel,
  sendMessage,
} = require("../services/channelService");

channelRouter.route("/:id/join").put(auth, joinChannel);
channelRouter.route("/:id").get(getChannelDetails);
channelRouter.route("/").get(getAllChannels);
channelRouter.route("/").post(createChannel);

channelRouter.route("/:id/message").post(auth, sendMessage);


module.exports = channelRouter;
