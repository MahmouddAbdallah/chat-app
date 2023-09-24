const Chat = require("../model/Chat");
const Message = require("../model/Message");
const User = require("../model/user");

exports.sendMessage = async (req, res) => {
    try {
        const { content, chatId } = req.body;
        if (content) {
            if (chatId) {
                let message = await Message.create({
                    sender: req.user._id,
                    content,
                    chat: chatId
                })

                // message = await User.populate(message, { path: "sender", select: "name picture " })
                // message = await Chat.populate(message, { path: "chat", select: "chatName users " })
                // message = await User.populate(message, { path: "chat.users", select: "name picture " })

                //update the latest message

                await Chat.findByIdAndUpdate(chatId, {
                    latestMessage: message
                })
                res.status(201).json({ message });

            } else {
                res.status(400).json({ error: 'Please selecte chat' })
            }
        } else {
            res.status(400).json({ error: 'Please write somthing' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.allMessages = async (req, res) => {
    try {
        const { chatId } = req.params
        if (chatId) {
            let messages = await Message.find({
                chat: chatId
            }).select("-__v -updatedAt -chat")
            //     .populate({ path: "sender", select: "name picture " })
            //     .populate({ path: "chat", select: "chatName users " })
            // messages = await User.populate(messages, { path: "chat.users", select: "name picture " })
            res.status(200).json({ messages })
        } else {
            res.status(400).json({ error: 'Please click on chat.' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}