const express = require('express')
const { singup, singin } = require('../controller/authController')
const { upload } = require('../middleware/uploadImage')


const router = express.Router()
router.post("/signup", upload('image'), singup)
router.post("/signin", singin)
module.exports = router