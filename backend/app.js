const express = require("express");
const app = express()

const errorMiddleware = require("./middlewares/error")

app.use(express.json())


const products = require("./routes/productsRoute")


app.use("/api/v1", products);

// Middleware for Errors

app.use(errorMiddleware)

module.exports = app