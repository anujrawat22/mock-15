const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture  : {type : String, default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"},
  contactList  : [{type : mongoose.Schema.Types.ObjectId,ref : "user"}]
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
