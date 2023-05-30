const express = require("express");
const router = express.Router();
const authController = require("../controller/auth")
const postController = require("../controller/posts")
const crudController = require("../controller/crud")
//const nodemailer = require("nodemailer");
const passport = require('passport')
const cors = require('cors')
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)
router.post('/postfeat', postController.postFeat)
router.get("/checkuser", authController.checkUser)
router.get('/renderfeats', postController.getFeats)
router.get('/getusers', postController.getUser)
router.get('/getusers', postController.getUser)
router.put('/like', crudController.addLike)
module.exports = router;