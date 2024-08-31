// after user is logged in
const express = require("express");
const router = express.Router();
const controller = require("../controllers/messagesController");

router.get("/", controller.getHomePage);
router.get("/join-club", controller.getJoinClub);
router.get("/new-message", controller.getMessageForm)

router.post("/join-club", controller.postJoinClub);
router.post("/new-message", controller.postMessageForm)

module.exports = router;
