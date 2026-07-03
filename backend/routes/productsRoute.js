const { Router } = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController")

const router = Router()

router.get("/products", getAllProducts)
router.get("/product/:id", getProductDetails)
router.post("/product/new", createProduct)
router.patch("/product/:id", updateProduct)
router.delete("/product/:id", deleteProduct)

module.exports = router