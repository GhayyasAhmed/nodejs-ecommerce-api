const Product = require("../models/productModel")


// admin route
exports.createProduct = async (req,res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

exports.getAllProducts = async (req, res, next) => {
    const products = await Product.find({})
    
    res.status(200).json({message: "Products fetched successfully", data: products})
}


exports.getProductDetails = async (req, res, next) => {
    const {id} = req.params;
    let product = await Product.findById(id)
    if(!product){
        return res.status(404).json({success: false, error: "Product not found"})
    }    
    res.status(200).json({success: true, message: "Product fetched successfully", data: product})
}

// admin route

exports.updateProduct = async (req, res, next) => {
    const {id} = req.params;
    let product = await Product.findById(id)
    if(!product){
        return res.status(404).json({success: false, error: "Product not found"})
    }
    product = await Product.findByIdAndUpdate(id, req.body,{ returnDocument: 'after', runValidators: true, useFindAndModify: false })
    
    res.status(200).json({success: true, message: "Product updated successfully", data: product})
}


exports.deleteProduct = async (req, res, next) => {
    const {id} = req.params;
    let product = await Product.findById(id)
    if(!product){
        return res.status(500).json({success: false, error: "Product not found"})
    }
    await Product.findByIdAndDelete(id)
    res.status(200).json({success: true, message: "Product deleted successfully"})
}