const { Router } = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, 
    getProductDetails, createProductReview, getProductReviews, deleteProductReviews } = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

const router = Router()

router.get("/", getAllProducts)
router.post("/admin/new", isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.patch("/admin/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.delete("/admin/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
router.put("/review",isAuthenticatedUser, createProductReview)
router.get("/review", getProductReviews)
router.delete("/review",isAuthenticatedUser, deleteProductReviews)
router.get("/:id", getProductDetails)


module.exports = router
