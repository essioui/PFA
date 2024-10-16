const express = require("express");
const router = express.Router();
const { protect } = require("../midleware/validateToken");

const {
    getFoods,
    createFood,
    updateFood,
    getFood,
    deleteFood
} = require("../controllers/foodController")

router.route("/").get(getFoods).post(protect ,createFood);

router.route("/:id").put(protect ,updateFood).get(getFood).delete(protect ,deleteFood);


module.exports = router
