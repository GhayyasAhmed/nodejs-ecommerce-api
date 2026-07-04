const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErros")
const ApiFeatures = require("../utils/apifeatures")

// admin route
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user=req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 5
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find({}), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query

    res.status(200).json({ success: true, count: productCount, data: products })
})


exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let product = await Product.findById(id)
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({ success: true, message: "Product fetched successfully", data: product })
})

// admin route

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let product = await Product.findById(id)
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    product = await Product.findByIdAndUpdate(id, req.body, { returnDocument: 'after', runValidators: true, useFindAndModify: false })

    res.status(200).json({ success: true, message: "Product updated successfully", data: product })
})


exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let product = await Product.findById(id)
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    await Product.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: "Product deleted successfully" })
})