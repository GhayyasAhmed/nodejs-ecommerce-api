const { Router } = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

const router = Router()

router.get("/products", getAllProducts)
router.get("/product/:id", getProductDetails)
router.post("/admin/product/new", isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.patch("/admin/product/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.delete("/admin/product/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

module.exports = router