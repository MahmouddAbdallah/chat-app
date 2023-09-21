const User = require("../model/user");

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const ModelQurey = User.find()
        const keyword = req.query.keyword || "";
        console.log(keyword);
        const search = {}
        if (keyword) {
            search.$or = [
                { name: { $regex: keyword, $options: "i" } },
                { email: { $regex: keyword, $options: "i" } },
            ]
        }
        ModelQurey.find(search)
        const user = await ModelQurey
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
