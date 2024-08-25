const express = require("express");
const controller = require("../controllers/indexController");
const router = express.Router();

router.get("/", controller.getSignUp);

router.post("/sign-up", controller.postSignUp);

module.exports = router;
