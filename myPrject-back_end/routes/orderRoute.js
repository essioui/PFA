const express = require("express");
const router = express.Router();

const { getFoods, getOrders, createOrder, updateOrder, deleteOrder }=require("../controllers/orderController");
const { getFood } = require("../controllers/foodController");
const { getDrinks } = require("../controllers/drinkController");

router.route("/foods").get(getFoods);
router.route("/drinks").get(getDrinks);
router.route("/").get(getOrders).post(createOrder);
router.route("/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;
