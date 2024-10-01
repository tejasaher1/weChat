const express = require("express");

const router = express.Router();

const messageController = require("../Controller/messageController")

router.get("/:chatId", messageController.allMessages);

router.post("/", messageController.sendMessage);

module.exports = router;