const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../util/jwt");
const { SECRET } = require("../config/config");

// TODO if user exists

exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {
    // Get user from DB
    const user = await User.findOne({email});

    // Check if user exists
    if (!user) {
        throw new Error("Cannot find username or password!");
    }

    // Check if password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error("Cannot find username or password!");
    }

    // Generate jwt token
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: "2h"});

    // return token
    return token;
};
