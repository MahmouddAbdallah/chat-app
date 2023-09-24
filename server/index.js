const express = require('express');
const mogran = require("morgan");
const env = require('dotenv')
const cors = require('cors');
const authRouter = require("./src/router/authRouter");
const userRouter = require("./src/router/userRouter");
const chatRouter = require("./src/router/chatRouter");
const messageRouter = require("./src/router/messageRouter");
const connectDB = require('./src/middleware/conntectdb');
const http = require('http');
// const { Server } = require('socket.io');

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
app.use('/message', messageRouter)

//
app.use(express.static("./upload"))



//connect db
connectDB()

//create server and run 
const server = http.createServer(app)
const port = process.env.PORT
server.listen(port, () => {
    console.log(`server run at ${port}`);
})

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})
io.on("connection", (socket) => {
    socket.on("userId", userId => {
        console.log(userId);
    })
})

