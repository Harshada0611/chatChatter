const express = require("express");
const router = express.Router();
// middleware
const authMiddleware = require("../middlware/middleware");
// controller
const {
  user_register,
  user_login,
  user_details,
} = require("../controller/user");

router.post("/user-register", user_register);
router.post("/user-login", user_login);
router.get("/user-details", authMiddleware, user_details);

module.exports = router;
