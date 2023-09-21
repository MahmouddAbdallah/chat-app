const express = require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromgroup, addTogroup } = require('../controller/chatController')
const { protectToken } = require('../middleware/authToken')
const router = express.Router()


router.route("/")
    .post(protectToken, accessChat)
    .get(protectToken, fetchChats)

router.post('/group', protectToken, createGroupChat)
router.put('/group/rename', protectToken, renameGroup)
router.put('/group/addtogroup', protectToken, addTogroup)
router.put('/group/removefromgroup', protectToken, removeFromgroup)


module.exports = router