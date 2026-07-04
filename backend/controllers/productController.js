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


// create new review or update the review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.body.productId)

    if(!product){
        return next(new ErrorHandler(`Product of id:${productId} does not exit`, 404))
    }
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment
    }

    const isReviewed = product.reviews.find(rev=> rev.user.toString() === req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = Number(req.body.rating),
                rev.comment= req.body.comment
            }
        })
    }else{
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length
    }

    // get average rating of the product
    let avg = product.reviews.reduce((acc, rev) => acc + rev.rating, 0)
    product.ratings = avg / product.reviews.length

    await product.save({validateBeforeSave: true})

    res.status(200).json({
        success: true,
        message: "Product rating updated successfully"
    })

})

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.query;
    const product = await Product.findById(id)

    if(!product){
        return next(new ErrorHandler(`Product of id:${id} does not exit`, 404))
    }
    res.status(200).json({
        success: true,
        data: product.reviews
    })

})

exports.deleteProductReviews = catchAsyncErrors(async (req, res, next) => {

    const { id, reviewId } = req.query;
    const product = await Product.findById(id)

    if(!product){
        return next(new ErrorHandler(`Product of id:${id} does not exit`, 404))
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== reviewId)

    // get average rating of the product
    
    let avg = reviews.reduce((acc, rev) => acc + rev.rating, 0)

    const ratings = avg ?  avg / reviews.length : 0

    const numberOfReviews = reviews.length

    await Product.findByIdAndUpdate(id, {ratings, numberOfReviews, reviews}, { returnDocument: 'after', runValidators: true, useFindAndModify: false })
    
    res.status(200).json({
        success: true,
    })
})
