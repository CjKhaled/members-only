const express = require("express");
const controller = require("../controllers/indexController");
const router = express.Router();

router.get("/", controller.getHomePage);
router.get("/sign-up", controller.getSignUp);
router.get("/join-club", controller.getJoinClub);
router.get("/log-in", controller.getLogin);

router.post("/sign-up", controller.postSignUp);
router.post("/join-club", controller.postJoinClub);
router.post("/log-in", controller.postLogin);

module.exports = router;
