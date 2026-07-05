const express = require("express");
const app = express()
const cookieParser = require("cookie-parser")

const errorMiddleware = require("./middlewares/error")

app.use(express.json())
app.use(cookieParser())

// Revert to Express 4 behavior for nested queries
app.set('query parser', 'extended'); 


const products = require("./routes/productsRoute")
const users = require("./routes/usersRoute")
const orders = require("./routes/ordersRoute")

app.use("/api/v1/product", products);
app.use("/api/v1/user", users);
app.use("/api/v1/order", orders);

// Middleware for Errors

app.use(errorMiddleware)

module.exports = app