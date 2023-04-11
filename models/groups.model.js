const mongoose = require("mongoose");

const GroupsSchema = mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  name: { type: String, required: true },
  members: [
    {
      userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      userName: { type: String, required: true },
    },
  ],
  messages: [
    {
      messageContent: { type: String, required: true },
      userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      userName: { type: String, required: true },
      createdAt: { type: Date, default: Date.now() },
    },
  ],
});

const GroupsModel = mongoose.model("Group", GroupsSchema);

module.exports = { GroupsModel };
