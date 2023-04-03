
const addToCart = async(req,res) => {
    // add an item to cart
    // store changes to db
}

const removeFromCart = async(req,res) => {
    // remove from the cart
    //  store the changes to db
}

const getCart = async(req,res) => {
    // get the saved cart
}


const checkout = async(req,res) => {
    // checkout and calculate the price
    // redirect to payment
}


module.exports = {addToCart, removeFromCart, getCart, checkout}