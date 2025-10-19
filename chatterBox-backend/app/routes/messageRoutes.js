const express = require("express");
const { auth } = require("../middleware/authenticationHandler");
const messageRouter = express.Router();

const {
        getAllMessages,
    } = require("../services/messageService");

messageRouter.route("/:id").get(getAllMessages);

module.exports =  messageRouter
