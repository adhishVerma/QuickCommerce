const Product = require('../models/productModel.js')

const getProduct = async(req,res) => {
    // get single product details
    const id  = req.query.id
    const product = await Product.findById(id)
    res.render('singleProduct', {layout : 'main',
    name : product.name,
    price : product.price,
    details : product.details,
    category : product.category
})
}

const getAllProducts = async(req,res) => {
    // get all the products
    const products = await Product.find()
    // render the products and send back the page
    res.render('category', {layout: 'main', category: 'All'})
}

const addProduct = async(req,res) => {
     // verify if admin, try and setup a middleware for it
     const product = await Product.create(
        {}
     )
}

const updateProduct = async(req,res) => {
     // verify if admin, try and setup a middleware for it
    //  writing the update query
     const product = await Product.findByIdAndUpdate(id, {})
    // update the product details
}

const deleteProduct = async(req,res) => {
    // verify if admin
    const product = await Product.findByIdAndDelete(id)
    // delete the product
}

module.exports = {getProduct, getAllProducts, addProduct, updateProduct, deleteProduct}
