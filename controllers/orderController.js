const User = require('../models/userModel.js')


const addToCart = async(req,res) => {
    // add an item to cart
    const user = User.findById(id)
    const cart = user.cart
    // modify user cart
    cart[item] = cart.get(item) + quantity
    // store changes to db
}

const removeFromCart = async(req,res) => {
    // remove from the cart
    const user = User.findById(id)
    const cart = user.cart
    //  store the changes to db
    cart.get(item)
}

const getCart = async(req,res) => {
    // get the saved cart
    const userId = req.user
    const user = await User.findById(userId)
    console.log(user.cart)
    const cart = user.cart
    // console.log(cart.get('item1') ? cart.get('item1') : 0)
    // get all individual product details and populating the cart
    res.render('cart', {title: 'cart', isLoggedIn : true})
}


const checkout = async(req,res) => {
    // checkout and calculate the price
    const user = await User.findById(id)
    const cart = user.cart
    // calculate cart value
    // redirect to payment page
}


module.exports = {addToCart, removeFromCart, getCart, checkout}