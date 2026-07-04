const { Router } = require("express")
const {registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile} = require("../controllers/userController")
const { isAuthenticatedUser } = require("../middlewares/auth")


const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/password/forgot", forgotPassword)
router.put("/password/reset/:token", resetPassword)
router.get("/me", isAuthenticatedUser , getUserDetails)
router.put("/password/update", isAuthenticatedUser , updatePassword)
router.put("/me/update", isAuthenticatedUser , updateProfile)
module.exports = router