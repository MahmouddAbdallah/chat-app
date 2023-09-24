const Chat = require("../model/Chat");
const User = require("../model/user");

exports.accessChat = async (req, res) => {
    try {
        const { userId } = req.body;
        if (userId) {

            const isChat = await Chat.find({
                //if one-to-one isGroup must be false.
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: req.user._id } } },
                    { users: { $elemMatch: { $eq: userId } } }
                ]
            }).populate({ path: "users", select: "-password -createdAt -updatedAt" })
                .populate({ path: "latestMessage" })

            if (isChat.length === 1) {
                res.status(200).json(isChat[0])
            } else {
                let chat = await Chat.create({
                    chatName: "sender",
                    isGroupChat: false,
                    users: [
                        req.user._id,
                        userId
                    ]
                })
                chat = await User.populate(chat, { path: "users", select: "-password -createdAt -updatedAt -__v" })

                res.status(201).json(chat)
            }

        } else {
            res
                .status(400)
                .json({ error: "please enter the userId" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.fetchChats = async (req, res) => {
    try {
        const chat = await
            Chat.find({
                users: {
                    $elemMatch: {
                        $eq: req.user._id
                    }
                }
            })
                .populate({
                    path: "users",
                    select: "-password -createdAt -updatedAt -__v"
                })
                .populate({
                    path: "latestMessage", select: " content"
                })

        res.status(201).json(chat)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.createGroupChat = async (req, res) => {
    try {
        const { users, name } = req.body
        if (users) {
            if (name) {
                const user = [...users, req.user._id]
                let groupChat = await Chat.create({
                    chatName: name,
                    isGroupChat: true,
                    users: user,
                    groupAdmin: req.user
                })

                groupChat = await User.populate(groupChat, { path: "users", select: "-password -createdAt -updatedAt -__v" })
                res.status(201).json(groupChat)

            } else {
                res.status(400).json({ error: "please add name to group." })
            }
        } else {
            res.status(400).json({ error: "please add users." })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.renameGroup = async (req, res) => {
    try {
        const { chatId, chatName } = req.body
        if (chatId) {
            if (chatName) {
                const chat = await Chat.findByIdAndUpdate(chatId,
                    { chatName },
                    { new: true })
                    .populate({ path: "users", select: "-password -createdAt -updatedAt -__v" })
                    .populate({ path: "latestMessage" })

                res.status(200).json(chat)
            } else {
                res.status(400).json({ error: "please add name to you chat" })
            }
        } else {
            res.status(400).json({ error: "please add chatId" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.addTogroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body
        if (chatId) {
            if (userId) {
                const chat = await Chat.findByIdAndUpdate(chatId,
                    { $push: { users: userId } },
                    { new: true })
                    .populate({ path: "users", select: "-password -createdAt -updatedAt -__v" })
                    .populate({ path: "latestMessage" })

                res.status(200).json(chat)
            } else {
                res.status(400).json({ error: "please add name to you chat" })
            }
        } else {
            res.status(400).json({ error: "please add chatId" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.removeFromgroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body
        if (chatId) {
            if (userId) {
                const chat = await Chat.findByIdAndUpdate(chatId,
                    { $pull: { users: userId } },
                    { new: true })
                    .populate({ path: "users", select: "-password -createdAt -updatedAt -__v" })
                    .populate({ path: "latestMessage" })

                res.status(200).json(chat)
            } else {
                res.status(400).json({ error: "please add name want to remove from chat" })
            }
        } else {
            res.status(400).json({ error: "please add chatId" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}