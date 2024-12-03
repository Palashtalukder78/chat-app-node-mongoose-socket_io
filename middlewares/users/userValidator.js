const { check, validationResult } = require("express-validator");
const User = require('../../models/peoples');
const { unlink } = require("fs");
const createError = require('http-errors');
const path = require('path');

const addUserValidator = [
    check("name")
        .isLength({ min: 1 })
        .withMessage("Name is Required")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError("Email already useed!")
                }
            } catch (error) {
                throw createError(error.mesage)
            }
        }),
    check("mobile")
        .isMobilePhone("bn-BD", {
            strictMode: true
        })
        .withMessage("Mobile number mus be a Bangladeshi mobile number with the country code!")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ mobile: value });
                if (user) {
                    throw createError("Mobile already useed!")
                }
            } catch (error) {
                throw createError(error.mesage)
            }
        }),
    check("password")
        .isStrongPassword()
        .withMessage("Password must need 8 characters long & should contains at least 1 lowercase, 1 uppercase, 1 number, 1 symbol")
];

const addUserValidatorHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        //Removed uploaded files
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/${filename}`),
                (err) => {
                    if (err)
                        console.log(err)
                }
            )
        }
        //response the errors
        res.status(500).json({
            errors: mappedErrors
        })
    }
}

module.exports = { addUserValidator, addUserValidatorHandler };