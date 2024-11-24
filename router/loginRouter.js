//external imports
const express = require("express");

//Internal export
const { getLogin } = require("../controller/loginController");

const router = express.Router();

router.get("/", getLogin);

module.exports = router;
