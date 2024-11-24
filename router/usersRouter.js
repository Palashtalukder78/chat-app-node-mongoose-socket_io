//external imports
const express = require("express");

//Internal export
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");

const router = express.Router();

router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
