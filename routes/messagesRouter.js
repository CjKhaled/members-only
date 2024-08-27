// after user is logged in
const express = require("express");
const router = express.Router();
const controller = require("../controllers/messagesController");

router.get("/", controller.getHomePage);
router.get("/join-club", controller.getJoinClub);

router.post("/join-club", controller.postJoinClub);

module.exports = router;
