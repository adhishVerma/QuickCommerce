const express = require('express')
const router = express.Router()
const {getCart,checkout}  = require("../controllers/orderController")

//  cart data
router.route('/cart').get(getCart)

// checkout
router.route('/checkout').post(checkout)

// order status

module.exports = router