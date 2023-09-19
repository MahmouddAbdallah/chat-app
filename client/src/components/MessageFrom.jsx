import { useEffect } from "react"
import { UseContext } from "../context/appContext"

const MessageFrom = () => {
    const { socket, messages, setMessages } = UseContext()
    useEffect(() => {
        socket.on('room-messages', (msgs) => {
            setMessages(msgs)
        })
    }, [])
    console.log(messages);
    return (
        <div className=" h-full">
            New Branch
        </div>
    )
}

export default MessageFrom