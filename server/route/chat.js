const express = require("express");
const router = express.Router();
// middleware
const authMiddleware = require("../middlware/middleware");
// controller
const { create_new_chat, fetch_active_chats } = require("../controller/chat");

router.get("/fetch-active-chats", authMiddleware, fetch_active_chats);
router.post("/create-new-chat", authMiddleware, create_new_chat);

module.exports = router;
