const getProduct = async(req,res) => {
    // get single product details
}

const getAllProducts = async(req,res) => {
    // get all the products in json
}

const addProduct = async(req,res) => {
     // verify if admin, try and setup a middleware for it
    //  add the product to catalogue
}

const updateProduct = async(req,res) => {
     // verify if admin, try and setup a middleware for it
    // update the product details
}

const deleteProduct = async(req,res) => {
    // verify if admin
    // delete the product
}

module.exports = {getProduct, getAllProducts, addProduct, updateProduct, deleteProduct}
