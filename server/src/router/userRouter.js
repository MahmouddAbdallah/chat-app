const express = require('express')
const { getUser, getUsers } = require('../controller/userController')


const router = express.Router()
router.route("/")
    .get(getUsers)
router.route("/:id")
    .get(getUser)
module.exports = router