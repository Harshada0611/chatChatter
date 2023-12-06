require("dotenv").config();
const User = require("../model/user");
const jwt = require("jsonwebtoken");

// signup new user
exports.user_register = async (req, resp) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return resp.json({ success: false, msg: "all fields are mandatory" });
  }
  try {
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return resp.json({ success: false, msg: "User already exist" });
    }
    const new_user = await User.create(req.body);
    resp.json({ success: true, msg: "User created", new_user });
  } catch (err) {
    resp.send(err);
  }
};

// login existing user
exports.user_login = async (req, resp) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return resp.json({ success: false, msg: "All fields are mandatory" });
  }
  try {
    const isExist = await User.findOne({ email: email });
    if (!isExist) {
      return resp.json({
        success: false,
        msg: "user not exist. please signup",
      });
    } else {
      if (isExist.password !== password) {
        return resp.json({ success: false, msg: "Invalid password" });
      }
      const token = jwt.sign(
        { _id: isExist._id },
        process.env.JWT_SECRET_KEY || "JWTSECRETKEY",
        { expiresIn: "1d" }
      );
      return resp.json({
        success: true,
        msg: "Login successful",
        user: isExist,
        token,
      });
    }
  } catch (err) {
    return resp.send(err);
  }
};

// fetch login user details
exports.user_details = async (req, resp) => {
  try {
    const user = await User.findById(req.accountId);
    resp.send(user);
  } catch (err) {
    resp.send(err);
  }
};
