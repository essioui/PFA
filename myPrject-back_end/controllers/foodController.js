const asyncHandler = require("express-async-handler");
const Food = require("../models/foodModel");


//@des Get all Foods
//@route GET /api/foods
//access public
const getFoods = asyncHandler(async (req, res) => {
    const foods = await Food.find();
    res.status(200).json(foods);
});


//@des Post Food
//@route POST /api/foods
//access public
const createFood = asyncHandler(async (req, res) => {
    console.log("the request body is: ", req.body);
    const {name, price, category, description} = req.body;
    if(!name || !category || !price) {
        res.status(400);
        throw new Error("All Fields are mondatory !");
    }
    const food = await Food.create({
        name,
        price,
        category,
        description: description || undefined,
    });
    res.status(201).json(food);
});


//@des Update Food
//@route PUT /api/foods/:id
//access public
const updateFood = asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params.id);
    if(!food) {
        res.status(404);
        throw new Error("Food not found");
    }

    const updateFood = await Food.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateFood);
});


//@des Get Food
//@route GET /api/foods/:id
//access public
const getFood = asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params.id);
    if(!food) {
        res.status(404);
        throw new Error("Food not found");
    }
    res.status(200).json(food);
});


//@des Delete Food
//@route DELETE /api/foods/:id
//access public
const deleteFood = asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params.id);
    if(!food) {
        res.status(404);
        throw new Error("Food not found");
    }

    await food.deleteOne();
    res.status(200).json(food);
});

module.exports = {
    getFoods,
    createFood,
    updateFood,
    getFood,
    deleteFood
}