//external imports
const express = require("express");

//Internal export
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");

const router = express.Router();

router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;
