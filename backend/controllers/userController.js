const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErros");
const sendToken = require("../utils/jwtToken");

// Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample public id",
            url: "profilepicurl"
        }

    });

    sendToken(user, 201, res)

})

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // checking if user has given email and password both

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res)

})