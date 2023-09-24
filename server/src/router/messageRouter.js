const express = require('express')
const { protectToken } = require('../middleware/authToken')
const { allMessages, sendMessage } = require('../controller/messageController')

const router = express.Router()
router.post("/", protectToken, sendMessage)
router.get("/:chatId", protectToken, allMessages)

module.exports = router