//external imports
const express = require("express");

//Internal export
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidator, addUserValidatorHandler } = require("../middlewares/users/userValidator");

const router = express.Router();

router.get("/", decorateHtmlResponse("Users"), getUsers);
router.post("/", avatarUpload, addUserValidator, addUserValidatorHandler);

module.exports = router;
