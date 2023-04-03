const express = require('express');
const router = express.Router();
const {userSignup, login,logout}  = require("../controllers/authController")


// SignUp
router.route("/signup").post(userSignup)
// Login
router.route("/login").post(login)
// Logout
router.route("/logout").get(logout)
// Reset Password


module.exports = router