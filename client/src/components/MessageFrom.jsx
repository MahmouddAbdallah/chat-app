import { useEffect } from "react"
import { UseContext } from "../context/appContext"

const MessageFrom = () => {
    const { socket, messages, setMessages, selectChat } = UseContext()
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        // (from, to)
        socket.emit('get_Message', userId, selectChat)
        socket.on("get_Message", (messages) => {
            setMessages(messages)
        })
    }, [selectChat])
    console.log(messages);
    return (
        <div className=" h-full">
            {
                messages.map((items) => {
                    return (
                        <div key={items._id}>
                            {items.content}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MessageFrom