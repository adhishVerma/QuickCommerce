const jwt = require('jsonwebtoken');

const protect = async (req,res,next) => {
    try{
        // verifying the token 
        const token  = req.headers.cookie.slice(12)
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.id
        next()
    }catch (err){
        res.status(278).redirect('/login')  
    }
}


module.exports  = protect 