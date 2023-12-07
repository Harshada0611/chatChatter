const express = require("express");
const router = express.Router();
// middleware
const authMiddleware = require("../middlware/middleware");
// controller
const {
  user_register,
  user_login,
  user_details,
  all_users,
  search_user,
} = require("../controller/user");

router.post("/user-register", user_register);
router.post("/user-login", user_login);
router.get("/user-details", authMiddleware, user_details);
router.get("/all-users", authMiddleware, all_users);
router.get("/search-user", authMiddleware, search_user);

module.exports = router;
