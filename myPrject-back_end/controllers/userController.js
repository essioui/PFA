const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@des register a user
//@route POST /api/users/register
//access public
const registerUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const userAvailable = await User.findOne({username});
    if(userAvailable) {
        res.status(400);
        throw new Error(`${username} is found you can change other name`);
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed is: " ,hashedPassword);
    const user = await User.create({
        username,
        password: hashedPassword,
    });

    console.log(`User created Successfuly ${user}`);

    if(user) {
        res.status(201).json({ _id: user.id, user: user.username});
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});


//@des login user
//@route POST /api/users/login
//access public
const loginUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body;
    if
    (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const user = await User.findOne({username});
    
    if (user) {

        //compare password with hashedpassword
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    id: user.id,
                },
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
            res.status(200).json({ accessToken });
        } else {
            res.status(401).json({ message: "Password is incorrect" });
        }
    } else {
        res.status(401).json({ message: "Username does not exist" });
    }
    
});

module.exports = {
    registerUser,
    loginUser
};
