const express = require('express')
const router = express.Router()
const {getCart,checkout, addToCart, removeFromCart}  = require("../controllers/orderController")
const protect = require('../middleware/authMiddleware.js')

//  cart data
router.route('/cart').get(protect,getCart)

// add to cart
router.route('/cart').post(protect, addToCart)

// delte from cart
router.route('/cart').delete(protect, removeFromCart)

// checkout
router.route('/checkout').post(checkout)

// order status

module.exports = router