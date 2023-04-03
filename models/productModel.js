const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name :  {
            type : String,
            required : [true, "please add a name"],
        },
        price : {
            type : Number,
            required : [true, "please enter the price"],
        },
        category : {
            type : Number,
            required : [true, "please enter the category"]
        },
        details : {
            type : String,
            required : [true, "please enter product details"]
        },
        photoURL : {
            type : String,
            required : [true, "please provide the product photo"]
        }
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model('User', productSchema)