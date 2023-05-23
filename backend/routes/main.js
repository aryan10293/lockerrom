const express = require("express");
const router = express.Router();
const authController = require("../controller/auth")
const crudController = require("../controller/posts")
//const nodemailer = require("nodemailer");
const passport = require('passport')
const cors = require('cors')
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)
router.post('/postfeat', crudController.postFeat)
router.get("/checkuser", authController.checkUser)
module.exports = router;