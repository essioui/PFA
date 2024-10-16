const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true
    },
    foods: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    drinks: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);
