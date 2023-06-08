const express = require("express");
const router = express.Router();
const authController = require("../controller/auth")
const postController = require("../controller/posts")
const crudController = require("../controller/crud")
const passport = require('passport')
const cors = require('cors')
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)
router.post('/postfeat', postController.postFeat)
router.post('/uploadImage', postController.postImage)

router.get("/checkuser", authController.checkUser)
router.get('/renderfeats', postController.getFeats)
router.get('/profile/:id', postController.getProfile)
router.get('/profilepost/:id', postController.getProfilePost)
router.get('/getpost/:id', postController.getPost)
router.get('/getusers', postController.getUser)
router.get('/lol/:id', postController.getPostComments)

router.put('/like', crudController.addLike)
router.put('/addcomment/:id', crudController.addComment)
router.put('/unlike', crudController.unlike)
router.put('/follow', crudController.follow)
router.put('/unfollow', crudController.unfollow)
router.put('/editprofile/:id', crudController.editProfile)
module.exports = router;