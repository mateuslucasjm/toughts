const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");


router.post("/login", AuthController.loginPost);
router.post("/register", AuthController.registerPost);
router.post("/logout", AuthController.logout);

module.exports = router;
