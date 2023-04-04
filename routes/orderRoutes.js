const express = require('express')
const router = express.Router()
const {getCart,checkout}  = require("../controllers/orderController")
const protect = require('../middleware/authMiddleware.js')

//  cart data
router.route('/cart').get(protect,getCart)

// checkout
router.route('/checkout').post(checkout)

// order status

module.exports = router