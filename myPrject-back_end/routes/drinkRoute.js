const express = require("express");
const router = express.Router();
const {protect} = require("../midleware/validateToken");

const {
    getDrinks,
    createDrink,
    updateDrink,
    getDrink,
    deleteDrink
} = require("../controllers/drinkController")

router.route("/").get(getDrinks).post(protect ,createDrink);

router.route("/:id").put(protect ,updateDrink).get(getDrink).delete(protect ,deleteDrink);


module.exports = router;
