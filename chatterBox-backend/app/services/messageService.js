const messageRepository = require("../database/repositories/messageRepository");
const expressAsyncHandler = require("express-async-handler");

const sendMessage = expressAsyncHandler(async (req, res) => {
  try {
    const { content} = req.body;
    const { channelId } = req.params.id;
    console.log("Channel id to send message is::"+ channelId);
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const result = await messageRepository.sendMessage({
          content: content,
          sender: userInfo._id,
          channelId: req.params.id,
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
    const { channelId } = req.body;
    const result = await messageRepository.getAllMessages(channelId);
    console.log(channelId)
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
  sendMessage,
  getAllMessages,
};
