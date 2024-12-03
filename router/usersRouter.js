//external imports
const express = require("express");
const { check } = require("express-validator");

//Internal export
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidator } = require("../middlewares/users/userValidator");

const router = express.Router();

router.get("/", decorateHtmlResponse("Users"), getUsers);
router.post("/", avatarUpload, addUserValidator);

module.exports = router;
