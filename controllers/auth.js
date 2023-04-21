const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const { email, name, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            name,
            password: hashedPass,
        });
        await user.save();

        res.status(201).json({
            message: "User created successfully",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error(
                "A user with this email could not be found."
            );
            error.statusCode = 401;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Wrong password!");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            { email: user.email, userId: user._id.toString() },
            "secretString",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token: token,
            userId: user._id.toString(),
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
