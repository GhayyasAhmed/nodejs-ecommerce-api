const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErros = require("./catchAsyncErros");
const jwt = require("jsonwebtoken")


exports.isAuthenticatedUser = catchAsyncErros(async(req,res,next) => {
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 403))
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id)
    next()
})


exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 401))
        }
        next()
    }
}