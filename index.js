const express = require('express');
require('dotenv').config()
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const Product = require('./models/productModel.js')
const app = express();
const expbs = require('express-handlebars');
const connectDB = require('./db/db.js')



app.engine('handlebars' , expbs.engine({ defaultLayout : 'main', allowProtoMethodsByDefault : true}));
app.set('view engine', 'handlebars')
app.set('views', './views')

connectDB()
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))


app.use("/auth", authRoutes);
app.use("/order", orderRoutes);
app.use("/product", productRoutes);

app.get("/", (req,res) => {
    if (req.headers.cookie.startsWith('accessToken')){
        res.render('index' , {title: 'Home Page', isLoggedIn : true})
    }else{
        res.render('index' , {title: 'Home Page', isLoggedIn : false})
    }
})

app.get("/signup",(req,res) => {
    if (req.headers.cookie.startsWith('accessToken')){
        res.redirect('/')
    }else{
        res.render('signup', { title : 'Sign Up', isLoggedIn : false})
    }
})

app.get("/login", (req,res) => {
    if (req.headers.cookie.startsWith('accessToken')){
        res.redirect('/')
    }
    else{
        res.render('login', {title : 'Sign in', isLoggedIn : false})
    }
})

app.get('/category/:category', async(req,res)=> {
    const {category} = req.params
    const capitalCat = category.charAt(0).toUpperCase() + category.slice(1)
    let products = []
    if (category === 'all'){
        products = await Product.find().lean()
    }else{
        products = await Product.find({category : category}).lean()
    }
    res.render('category', {category : capitalCat, title : capitalCat + ' products', products})
})


const PORT = process.env.PORT || 6500
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

