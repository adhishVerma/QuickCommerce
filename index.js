const express = require('express');
require('dotenv').config()
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const  https = require('https')
const app = express();
const expbs = require('express-handlebars');
const connectDB = require('./db/db.js')


app.engine('handlebars' , expbs.engine({ defaultLayout : 'main'}));
app.set('view engine', 'handlebars')
app.set('views', './views')

connectDB()
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))

app.use("/auth", authRoutes);
app.use("/order", orderRoutes);
app.use("/product", productRoutes);

app.get("/", (req,res) => {
    res.render('index' , {layout : 'main', title: 'Home Page'})
})

app.get("/signup",(req,res) => {
    res.render('signup', { layout : 'main', title : 'Sign Up'})
})

app.get("/login", (req,res) => {
    res.render('login', {layout: 'main', title : 'Sign in'})
})


const PORT = process.env.PORT || 6500
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

