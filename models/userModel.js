const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatId: {
    type: String,
  },
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  blocked: {
    type: String,
    enum: ["TRUE", "FALSE"],
    default: "FALSE",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
