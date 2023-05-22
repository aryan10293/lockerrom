const express = require("express");
const router = express.Router();
const authController = require("../controller/auth")
//const crudController = require("../controller/crud")
//const nodemailer = require("nodemailer");
const passport = require('passport')
const cors = require('cors')
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)
router.get("/checkuser", authController.checkUser)
module.exports = router;