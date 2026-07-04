const express = require("express");
const app = express()

const errorMiddleware = require("./middlewares/error")

app.use(express.json())

// Revert to Express 4 behavior for nested queries
app.set('query parser', 'extended'); 


const products = require("./routes/productsRoute")
const users = require("./routes/usersRoute")

app.use("/api/v1", products);
app.use("/api/v1/user", users);

// Middleware for Errors

app.use(errorMiddleware)

module.exports = app