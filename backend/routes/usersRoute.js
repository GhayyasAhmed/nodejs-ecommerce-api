const { Router } = require("express")
const {registerUser, loginUser} = require("../controllers/userController")


const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
// router.get("/users", getAllUsers)
// router.get("/product/:id", getProductDetails)
// router.patch("/product/:id", updateProduct)
// router.delete("/product/:id", deleteProduct)

module.exports = router