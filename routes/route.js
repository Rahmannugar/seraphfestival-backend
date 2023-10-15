const router = require("express").Router();

const { register, signUp } = require("../controller/appController.js");

router.post("/signup", signUp);
router.post("/register", register);

module.exports = router;
