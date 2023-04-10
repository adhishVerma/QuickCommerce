const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name :  {
            type : String,
            required : [true, "please add a name"],
        },
        email : {
            type : String,
            required : [true, "please add an email"],
        },
        password : {
            type : String,
            required : [ true, "please enter a password"]
        },
        telephone : {
            type : Number
        },
        cart : {
            type : Map,
            default : {}
        }
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model('User', userSchema)