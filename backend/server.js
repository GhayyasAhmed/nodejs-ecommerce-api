const app = require("./app")
const dotenv = require("dotenv");
const connectdatabase = require("./config/database")

//config

dotenv.config({path: "backend/config/config.env"})

//connecting db
connectdatabase()


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT} port`)
})
