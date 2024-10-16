const mongoose = require("mongoose");

const drinkSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add name of Drink"],
    },
    price: {
        type: String,
        require: [true, "Please add price of Drink"],
    },
    category: {
        type: String,
        require: [true, "Please add category of Drink"],
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
module.exports = mongoose.model("Drink", drinkSchema);
