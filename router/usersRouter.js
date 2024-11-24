//external imports
const express = require("express");

//Internal export
const { getUsers } = require("../controller/usersController");

const router = express.Router();

router.get("/", getUsers);

module.exports = router;
