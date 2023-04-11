const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  senderID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  recipientID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now() },
  messageContent: { type: String, required: true },
});

const MessageModel = mongoose.model("message", MessageSchema);

module.exports = { MessageModel };
