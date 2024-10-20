const asyncHandler = require("express-async-handler");
const Order = require("../models/ordreModel");
const Food = require("../models/foodModel");
const Drink = require("../models/drinkModel");


// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
const getFoods = asyncHandler(async (req, res) => {
    const foods = await Food.find();
    res.status(200).json(foods);
});


// @desc    Get all drinks
// @route   GET /api/drinks
// @access  Public
const getDrinks = asyncHandler(async (req, res) => {
    const drinks = await Drink.find();
    res.status(200).json(drinks);
});


//@des Get Order
//@route GET /api/orders/:id
//access public
const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        res.status(404);
        throw new Error("Food not found");
    }
    res.status(200).json(order);
});


//@des update an order
//@route PUT /api/orders/:id
//access public
const updateOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        res.status(404);
        return res.json("Order not found");
    }

    const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateOrder);
});


//@des delete an order
//@route DELETE /api/orders/:id
//access public
const deleteOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        res.status(404);
        return res.json("Order not found");
    }

    await order.deleteOne();
    res.status(200).json(order);
});


//@des get all orders
//@route GET /api/orders/
//access public
const getOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find();
    res.status(200).json(orders);
});



//@des create a new order
//@route POST /api/orders
//access public
const createOrder = asyncHandler(async (req, res) => {
    const { foods, drinks, tableNumber } = req.body;

    if (!foods || !drinks || !tableNumber) {
        res.status(400);
        throw new Error("Foods, Drinks, and table number are mandatory!");
    }

    
    const foodItems = await Food.find({ name: { $in: foods.map(f => f.name) } });
    
    const drinkItems = await Drink.find({ name: { $in: drinks.map(d => d.name) } });

    
    if (foodItems.length !== foods.length || drinkItems.length !== drinks.length) {
        res.status(404);
        throw new Error("Some foods or drinks were not found in the database.");
    }
    
    let totalPrice = 0;

    const updatedFoods = foods.map(f => {
        const foodItem = foodItems.find(item => item.name === f.name);
        totalPrice += foodItem.price * f.quantity;
        return { ...f, price: foodItem.price };
    });

    const updatedDrinks = drinks.map(d => {
        const drinkItem = drinkItems.find(item => item.name === d.name);
        totalPrice += drinkItem.price * d.quantity;
        return { ...d, price: drinkItem.price };
    });

    
    const order = await Order.create({
        foods: updatedFoods,
        drinks: updatedDrinks,
        tableNumber,
        totalPrice: parseFloat(totalPrice.toFixed(2))
    });

    res.status(201).json(order);
});



// @desc Update order status to "in progress"
// @route PUT /api/orders/progress/:id
// @access Admin
const updateOrderToInProgress = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    console.log({ currentStatus: order.status });

    
    if (order.status !== "pending") {
        return res.status(400).json({
            message: "Order cannot be modified once it is in progress or canceled",
        });
    }

    // change status to in progress
    order.status = "in progress";
    await order.save();

    
    res.status(200).json({
        message: "Order is now in progress",
        order,
    });
});




// @desc Cancel an order and send message to client
// @route  PUT /api/orders/cancel/:id
// @access Admin
const cancelOrderAndModify = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        res.status(404);
        return res.json("Order not found");
    }

    //change status to cancel
    order.status = "Canceled";
    await order.save();

    //send message from admin
    const { message } = req.body;
    const adminMessage = message || "Order has canceled";

    res.status(200).json({
        message: adminMessage,
        order
    });
});


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrder,
    getFoods,
    getDrinks,
    cancelOrderAndModify,
    updateOrderToInProgress
}
