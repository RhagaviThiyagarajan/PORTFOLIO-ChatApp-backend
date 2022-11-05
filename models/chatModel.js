const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "chatAppUser" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatAppMessage",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "chatAppUser" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chatAppChat", chatModel);

module.exports = Chat;
