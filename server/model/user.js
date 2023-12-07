const mongoose = require("mongoose");

const user_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", user_schema);
