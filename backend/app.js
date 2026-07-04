const express = require("express");
const app = express()

const errorMiddleware = require("./middlewares/error")

app.use(express.json())

// Revert to Express 4 behavior for nested queries
app.set('query parser', 'extended'); 


const products = require("./routes/productsRoute")


app.use("/api/v1", products);

// Middleware for Errors

app.use(errorMiddleware)

module.exports = app