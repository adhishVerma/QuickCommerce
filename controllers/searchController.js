const Product = require('../models/productModel.js')


const search = async(req,res) => {
    const {searchText} = req.body
    const result = await Product.aggregate().search({
        text : {
            query : searchText,
            path : 'name',
        }
    })
    res.json(result)
}

module.exports = { search }