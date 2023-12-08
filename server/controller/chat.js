const Chat = require("../model/chat");

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
