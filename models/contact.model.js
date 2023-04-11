const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  contactID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  contactName: { type: String, required: true },
});

const ContactModel = mongoose.model("contact", ContactSchema);

module.exports = { ContactModel };
