const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErros")


exports.createOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body


    // check if product is sufficient or not for requested quantity
    for (const orderItem of orderItems) {
        const product = await Product.findById(orderItem.product);
        if (product.stock < orderItem.quantity) {
            return next(new ErrorHandler(`Insufficient stock for ${product.name}`, 400));
        }
    }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        message: "Order created successfully",
        order
    })
})


exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }

    if(req.user._id.toString() !== order.user._id.toString()){
        return next(new ErrorHandler("Invalid credentials", 401))
    }

    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: order
    })
})

// get logged in user orders

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        data: orders
    })
})


// get all orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0

    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        message: "All orders fetched successfully",
        data: {
            orders,
            totalAmount
        }
    })
})



// update order status -- Admin
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }
    if(order.orderStatus === "Delivered"){
        return next("You have already delivered this order", 400)
    }

    order.orderItems.forEach(async (orderItem) => {
        await updateStock(orderItem.product, orderItem.quantity)
    })

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave: false})
    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
    })
})



async function updateStock(productId, quantity){
    const product = await Product.findById(productId)
    product.stock -= quantity

    await product.save({validateBeforeSave: false})
}


// delete order - admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler(`Order does not exist with id: ${req.params.id}`, 404))
    }

    await Order.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
    })
})