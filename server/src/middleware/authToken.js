const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.protectToken = async (req, res, next) => {
    try {
        //token is exist 
        const authorization = req.headers.authorization
        if (authorization && authorization.startsWith('Bearer')) {
            const token = authorization.split(" ")[1]
            const { id } = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(id)
            if (user) {
                req.user = user;
                next();
            }
            else {
                res
                    .status(400)
                    .json({ error: 'this user is not exist' })
            }
        } else {
            res
                .status(400)
                .json({ error: 'enter token' })
        }
    } catch (error) {
        res
            .status(400)
            .json({ error: error.message })
    }
}