exports.getChatRoom = (req, res) => {
    try {
        res.status(200).json("req")
    } catch (error) {
        res.status(400).json({ error })
    }
}