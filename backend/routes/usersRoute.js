const { Router } = require("express")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword,
    getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUsers,
    updateRole, deleteUser
} = require("../controllers/userController")


const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/password/forgot", forgotPassword)
router.put("/password/reset/:token", resetPassword)
router.get("/me", isAuthenticatedUser, getUserDetails)
router.put("/password/update", isAuthenticatedUser, updatePassword)
router.put("/me/update", isAuthenticatedUser, updateProfile)
router.get("/admin/users", isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.get("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), getSingleUsers)
router.put("/admin/user/:id/role", isAuthenticatedUser, authorizeRoles("admin"), updateRole)
router.delete("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router