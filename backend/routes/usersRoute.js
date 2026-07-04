const { Router } = require("express")
const {registerUser, loginUser, logoutUser, forgotPassword, resetPassword} = require("../controllers/userController")


const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/password/forgot", forgotPassword)
router.put("/password/reset/:token", resetPassword)

module.exports = router