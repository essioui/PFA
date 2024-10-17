const express = require("express");
const router = express.Router();

const {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderToInProgress,
    cancelOrderAndModify

}=require("../controllers/orderController");
const { getFoods } = require("../controllers/foodController");
const { getDrinks } = require("../controllers/drinkController");

router.route("/foods").get(getFoods);
router.route("/drinks").get(getDrinks);
router.route("/").get(getOrders).post(createOrder);
router.route("/:id").put(updateOrder).delete(deleteOrder);
router.put('/orders/progress/:id', updateOrderToInProgress);
router.put('/orders/cancel/:id', cancelOrderAndModify);

module.exports = router;
