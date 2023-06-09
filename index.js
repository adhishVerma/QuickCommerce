const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const searchRoutes = require("./routes/searchRoutes");
const Product = require("./models/productModel.js");
const app = express();
const expbs = require("express-handlebars");
const connectDB = require("./db/db.js");


app.engine(
  "handlebars",
  expbs.engine({ defaultLayout: "main", 
  allowProtoMethodsByDefault: true})
);
app.set("view engine", "handlebars");
app.set("views", "./views");

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/order", orderRoutes);
app.use("/product", productRoutes);
app.use("/search", searchRoutes);

app.get("/", (req, res) => {
  if (req.headers.cookie && req.headers.cookie.startsWith("accessToken")) {
    res.render("index", { title: "Welcome", isLoggedIn: true });
  } else {
    res.render("index", { title: "Welcome", isLoggedIn: false });
  }
});

app.get("/signup", (req, res) => {
  if (req.headers.cookie && req.headers.cookie.startsWith("accessToken")) {
    res.redirect("/");
  } else {
    res.render("signup", { title: "Sign Up", isLoggedIn: false });
  }
});

app.get("/login", (req, res) => {
  if (req.headers.cookie && req.headers.cookie.startsWith("accessToken")) {
    res.redirect("/");
  } else {
    res.render("login", { title: "Sign in", isLoggedIn: false });
  }
});

app.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  let products = [];
  if (category === "all") {
    products = await Product.find().lean();
  } else {
    try {
      products = await Product.find({ category: category }).lean();
    } catch (err) {
      console.log(err);
    }
  }
  const capitalCat = category.charAt(0).toUpperCase() + category.slice(1);
  const isLoggedIn = req.headers.cookie
  res.render("category", { category: capitalCat, title: capitalCat, products, isLoggedIn });
});

app.get("/search", async(req,res) => {
    const isLoggedIn = req.headers.cookie
    res.render("search", {title : "search", isLoggedIn})
}) 

const PORT = process.env.PORT || 6500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
