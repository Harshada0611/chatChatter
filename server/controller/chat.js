const Chat = require("../model/chat");
const Message = require("../model/message");

// fetch all active  chats of current user
exports.fetch_active_chats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: {
        $in: [req.accountId],
      },
    })
      .populate("members")
      .populate("lastMessage")
      .populate({ path: "lastMessage", populate: { path: "sender" } })
      .sort({ updatedAt: -1 });
    res.send({
      success: true,
      message: "Chats fetched successfully",
      data: chats,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error fetching chats",
      error: error.message,
    });
  }
};

// create new chat
exports.create_new_chat = async (req, res) => {
  try {
    const newChat = new Chat(req.body);
    const savedChat = await newChat.save();

    // populate members and last message in saved chat
    await savedChat.populate("members");
    res.send({
      success: true,
      message: "Chat created successfully",
      data: savedChat,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error creating chat",
      error: error.message,
    });
  }
};

// clear unread messages and update unread message count:0
exports.clear_unread_messages = async (req, resp) => {
  if (!req.params.chatId) {
    return resp.json({ success: false, msg: "chat id empty" });
  }
  try {
    const isChat = await Chat.findById(req.params.chatId);

    if (isChat) {
      //find chat and update lastMesssage as read
      let readChat = await Chat.findByIdAndUpdate(
        isChat._id,
        {
          unreadMessages: 0,
        },
        { new: true }
      );
      // find all unread messages of this chat and update them to read
      const readmessage = await Message.updateMany(
        {
          chat: req.params.chatId,
          read: false,
        },
        { read: true }
      );
      return resp.json({
        sucess: true,
        msg: "unread messages cleared successfully",
      });
    } else {
      resp.json({ success: false, msg: "chat not found" });
    }
  } catch (err) {
    return err;
  }
};
