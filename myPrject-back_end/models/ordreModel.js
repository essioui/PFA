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
    adminMessage: {
        type: String,
        default: ''
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Order", orderSchema);
