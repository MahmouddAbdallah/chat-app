const express = require('express')
const { getChatRoom } = require('../controller/chatController')
const router = express.Router()


router.get('/room', getChatRoom)


module.exports = router