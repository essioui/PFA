const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;

        next();
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };
