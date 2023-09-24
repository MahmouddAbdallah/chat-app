const express = require('express')
const { getUser, getUsers } = require('../controller/userController')
const { protectToken } = require('../middleware/authToken')


const router = express.Router()
router.route("/")
    .get(protectToken, getUsers)
router.route("/:id")
    .get(protectToken, getUser)
module.exports = router