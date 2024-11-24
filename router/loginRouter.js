//external imports
const express = require("express");

//Internal export
const { getLogin } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");

const router = express.Router();

router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
