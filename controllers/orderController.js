const User = require('../models/userModel.js')
const Product = require('../models/productModel.js');


const addToCart = async(req,res) => {
    // destructuring the product id
    const {productId} = req.body
    
    const userId = req.user
    
    const user = await User.findById(userId)
    let cart = user.cart

    // add an item to cart
    quantity = (cart.get(productId) ? cart.get(productId) : 0) + 1 
    cart.set(productId, quantity)

    // store changes to db
    user.save()

    res.status(200).json("success")
}

const removeFromCart = async(req,res) => {
    // remove from the cart
    const  {productId} = req.body
    const userId = req.user
    const user = await User.findById(userId)
    let cart = user.cart
    await cart.delete(productId)
    user.save()
    res.status(200).json("success")
}

const getCart = async(req,res) => {
    const userId = req.user
    const user = await User.findById(userId)
    // get the saved cart
    const cart = user.cart
    let cartTotal = 0
    const cartKeys = Array.from(cart.keys())
    // populating the cart array
    const products = await Promise.all(cartKeys.map(async(elementId) => {
        // get all individual product details and populating the cart
        const product = await Product.findById(elementId)
        const total = Number(cart.get(elementId))*product.price
        cartTotal += total
        return {
            photoURL : product.photoURL,
            name : product.name,
            price : product.price,
            quantity : cart.get(elementId),
            total : total,
            id : product._id
        }
    }))

    res.render('cart', {title: 'cart', isLoggedIn : true, cart : products, cartTotal: cartTotal})
}


const checkout = async(req,res) => {
    // checkout and calculate the price
    const user = await User.findById(id)
    const cart = user.cart
    // calculate cart value
    // redirect to payment page
}


module.exports = {addToCart, removeFromCart, getCart, checkout}