const { Router } = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, 
    getProductDetails, createProductReview, getProductReviews, deleteProductReviews } = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

const router = Router()

router.get("/products", getAllProducts)
router.get("/product/:id", getProductDetails)
router.post("/admin/product/new", isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.patch("/admin/product/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.delete("/admin/product/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
router.put("/products/review",isAuthenticatedUser, createProductReview)
router.get("/products/review", getProductReviews)
router.delete("/products/review",isAuthenticatedUser, deleteProductReviews)


module.exports = router