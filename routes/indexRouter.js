// before user is logged in
const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");


router.get("/", controller.getHomePage);
router.get("/sign-up", controller.getSignUp);
router.get("/log-in", controller.getLogin);

router.post("/sign-up", controller.postSignUp);
router.post("/log-in", controller.postLogin);

module.exports = router;
