const express = require("express");
const errorHandler = require("./midleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/foods", require("./routes/foodRoute"));
app.use("/api/drinks", require("./routes/drinkRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}).on('error', (err) => {
    console.error('Error occurred:', err.message);
});
