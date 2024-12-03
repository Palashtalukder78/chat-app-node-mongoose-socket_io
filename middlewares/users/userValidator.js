const { check } = require("express-validator");
const User = require('../../models/peoples')


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



module.exports = { addUserValidator };