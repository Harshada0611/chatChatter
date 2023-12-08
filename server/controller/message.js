const Message = require("../model/message");
const Chat = require("../model/chat");

// send new message
exports.send_new_message = async (req, resp) => {
  console.log(req.body);
  try {
    // store message
    const newMessage = new Message(req.body);
    let savedMessage = await newMessage.save();
    savedMessage = await savedMessage.populate("sender");
    // update last message of chat
    await Chat.findByIdAndUpdate(
      { _id: req.body.chat },
      {
        lastMessage: savedMessage._id,
        uread: { $inc: 1 },
      }
    );
    resp.json({ success: true, msg: "new message sent", savedMessage });
  } catch (err) {
    resp.json({ success: false, msg: err });
  }
};

// get all messages of selected chat
exports.get_all_chat_messages = async (req, resp) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
    })
      .populate("sender", "name")
      .sort({ createdAt: 1 });
    resp.send({
      success: true,
      msg: "messages fetched successfully",
      messages,
    });
  } catch (err) {
    resp.json({ success: false, msg: err });
  }
};
