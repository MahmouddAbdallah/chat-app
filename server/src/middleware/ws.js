
const wss = new ws.WebSocketServer({ server })

wss.on("connection", async (connection, req, res) => {
    const token = req.headers.cookie.split("token=")[1]
    if (token) {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        connection.userId = id
        const clients = [...wss.clients]
        clients.forEach(client => {
            client.send(JSON.stringify({
                online: [...wss.clients]
                    .map(c => {
                        return ({ userId: c.userId })
                    })
            }))
        })
        console.log(id);
        connection.on("message", async (message) => {
            const messageData = JSON.parse(message)
            console.log(messageData);
            await MessageModel.create({
                userId: message.user,
                text: message.message,
            })
        })
    } else {
        console.log("not log");
    }
})

