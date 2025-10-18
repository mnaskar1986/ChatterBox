const express = require("express");
const { auth } = require("../middleware/authenticationHandler");
const messageRouter = express.Router();

const {
    getAllMessages,
    sendMessage,
} = require("../services/messageService");

messageRouter.route("/channels/:id/message").post(auth, sendMessage);
messageRouter.route("/channels/:id/message").get(auth, getAllMessages);

module.exports =  messageRouter
