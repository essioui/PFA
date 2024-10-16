const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name of Food"],
    },
    price: {
        type: Number,
        required: [true, "Please add price of Food"],
    },
    category: {
        type: String,
        required: [true, "Please add category of Food"],
    },
    description: {
        type: String,
        default: undefined,
    },
},
{
    timestamps: true,
}
);
module.exports = mongoose.model("Food", foodSchema);
