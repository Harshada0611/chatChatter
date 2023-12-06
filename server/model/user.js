const mongoose = require("mongoose");

const user_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,
      required: true,
      default:
        "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", user_schema);
