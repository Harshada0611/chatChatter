const express = require("express");
const router = express.Router();
// middleware
const authMiddleware = require("../middlware/middleware");
// controller
const {
  send_new_message,
  get_all_chat_messages,
} = require("../controller/message");

router.post("/send-new-message", authMiddleware, send_new_message);
router.get(
  "/fetch-chat-message/:chatId",
  authMiddleware,
  get_all_chat_messages
);

module.exports = router;
