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

// fetch all users
exports.all_users = async (req, resp) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.accountId } });
    resp.send(allUsers);
  } catch (err) {
    resp.send(err);
  }
};

// serach user
exports.search_user = async (req, resp) => {
  console.log(req.query);
  const { search_user } = req.query;
  if (!search_user) {
    return resp.json({ success: false, msg: "No user" });
  }
  try {
    const user = new RegExp(search_user, "i");
    const findUsers = await User.find({
      $or: [{ email: user }, { name: user }],
      _id: { $ne: req.accountId },
    });
    if (findUsers.length) {
      return resp.json({ success: true, findUsers });
    }
    return resp.json({ success: false, msg: "no search result", findUsers });
  } catch (err) {
    return resp.json({ success: false, msg: err.message });
  }
};
