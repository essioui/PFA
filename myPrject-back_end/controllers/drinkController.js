const asyncHandler = require("express-async-handler");
const Drink = require("../models/drinkModel");

//@des Get all Drinks
//@route GET /api/drinks
//access public
const getDrinks = asyncHandler(async(req, res) => {
    const drinks = await Drink.find();
    res.status(200).json(drinks);
});


//@des Post Drink
//@route POST /api/drinks
//access public
const createDrink = asyncHandler(async(req, res) => {
    console.log("the request body is: ", req.body);
    const {name, price, category, description, quantity, imageUrl} = req.body;
    if(!name || !price || !category) {
        res.status(400);
        throw new Error("All Fields are mondatory !")
    }
    const drink = await Drink.create({
        name,
        price,
        category,
        description: description || undefined,
        quantity: quantity >= 2 ? quantity : 1,
        imageUrl,
    });
    res.status(201).json(drink);
});


//@des Update Drink
//@route PUT /api/drinks/:id
//access public
const updateDrink = asyncHandler(async(req, res) => {
    const drink = await Drink.findById(req.params.id);
    if(!drink) {
        res.status(404);
        throw new Error("Drink not found");
    }

    const updateDrink = await Drink.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateDrink);
});


//@des Get Drink
//@route GET /api/drinks/:id
//access public
const getDrink = asyncHandler(async(req, res) => {
    const drink = await Drink.findById(req.params.id);
    if(!drink) {
        res.status(404);
        throw new Error("Drink not found");
    }
    res.status(200).json(drink);
});


//@des Delete Drink
//@route DELETE /api/drinks/:id
//access public
const deleteDrink = asyncHandler(async(req, res) => {
    const drink = await Drink.findById(req.params.id);
    if(!drink) {
        res.status(404);
        throw new Error("Drink not found");
    }

    await drink.deleteOne();
    res.status(200).json(drink);
});

module.exports = {
    getDrinks,
    createDrink,
    updateDrink,
    getDrink,
    deleteDrink
}
