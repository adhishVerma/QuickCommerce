const bcrypt = require('bcrypt');
const User = require('../models/userModel.js')
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn: '14d' })
}

// @desc Signing up a new User
// @route /auth/signup
// @access public
const userSignup = async(req,res) => {
    // if fields are empty
    const {name, email, password, telephone} = req.body
    if(!name || !email || !password) {
        return res.status(400).json("Please add all fields");
    }
    //   Check if the user already exists
    const userExists = await User.findOne({email : email});
    if (userExists) {
        return res.status(400).json("user already exists");
    }
    // hasing the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword =  await bcrypt.hash(password, salt);

    // hash the password and create user
    const user = await User.create({
        name : name,
        email : email,
        password : hashedPassword,
        telephone : Number(telephone)
    })

    if (user) {
        res.cookie('accessToken', generateToken(user._id)).redirect('/')
    }else{
        res.status(400).json("some error occured")
    }
}

// @desc logging in a user
// @route /auth/login
// @access public
const login = async(req,res) => {
    // match the hashed password and entered password
    const {email, password} = req.body;
    // send JWT as cookie
    const user = await User.findOne({email : email});
    // compare password
    if (user && bcrypt.compare(password, user.password)){
        res.cookie('accessToken',  generateToken(user._id)).redirect('/')
    }else{
        res.status(403).json("Credentials invalid")
    }
}

// @desc logging out a user
// @route /auth/logout
// @access public
const logout = async(req, res) => {
    // delete the cookie
    res.clearCookie('accessToken').redirect('/')
}

// @desc resetting a password
// @route /auth/reset
// @access public
const resetPassword = async(req,res) => {
    // check the email id
    const {email, telephone} = req.body
    const  user = await User.findOne({email : email})
    // match the phone number
    if (user. telephone == Number(telephone)){
        res.cookie('accessToken', generateToken(user._id)).redirect('/resetpassword')
    }
    // reset the password
    // redirect to login
}


module.exports = { userSignup, login, logout}