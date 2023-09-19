const express = require('express');
const mogran = require("morgan");
const env = require('dotenv')
const cors = require('cors');
const authRouter = require("./src/router/authRouter");
const userRouter = require("./src/router/userRouter");
const chatRouter = require("./src/router/chatRouter");
const connectDB = require('./src/middleware/conntectdb');
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./src/model/Message');
const User = require('./src/model/user');

//create app
const app = express()

//config dotenv
env.config({ path: "./.env" });
//middleware 
app.use(express.json())
app.use(mogran('dev'))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


//routes
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/chat', chatRouter)




const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})
const getLastMessageFromRoom = async (room) => {
    let roomMessages = await Message.aggregate([
        { $match: { to: room } },
        { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } }
    ])
    return roomMessages
}

io.on("connection", (socket) => {
    socket.on("new-user", async () => {
        const users = await User.find({})
        io.emit('new-user', users)
    })
    socket.on("join-room", async (room) => {
        socket.join(room)
        let roomMessages = await getLastMessageFromRoom(room)
        socket.emit('room-messages', roomMessages)
    })
    socket.on("message-room", async (room, content, sender, time, date) => {
        await Message.create({ content, from: sender, time, date, to: room })
        let roomMessages = getLastMessageFromRoom(room);
        io.to(room).emit('room-messages', roomMessages);
        socket.broadcast.emit("notifications", room)
    })
})






//connect db
connectDB()

//run app
const port = process.env.PORT
server.listen(port, () => {
    console.log(`server run at ${port}`);
})