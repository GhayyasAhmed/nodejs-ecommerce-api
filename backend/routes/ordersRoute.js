const { Router } = require("express")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")
const { createOrder, getSingleOrder, myOrders, 
    getAllOrders, updateOrderStatus, deleteOrder

// getOrder, getAllOrders, updateOrder, deleteOrder 
} = require("../controllers/orderController")

const router = Router()

router.post("/new",isAuthenticatedUser, createOrder);
router.get("/me",isAuthenticatedUser, myOrders);
router.get("/admin/orders",isAuthenticatedUser,authorizeRoles("admin"), getAllOrders);
router.put("/admin/status/:id",isAuthenticatedUser,authorizeRoles("admin"), updateOrderStatus);
router.delete("/admin/:id",isAuthenticatedUser,authorizeRoles("admin"), deleteOrder);
router.get("/:id",isAuthenticatedUser, getSingleOrder);

module.exports = router
