const express = require('express')
const { getUser } = require('../controller/userController')


const router = express.Router()
router.route("/:id")
    .get(getUser)
module.exports = router