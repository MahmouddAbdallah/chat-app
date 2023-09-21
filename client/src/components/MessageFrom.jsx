import { useEffect } from "react"
import { UseContext } from "../context/appContext"

const MessageFrom = () => {
    const { socket, messages, setMessages, selectChat, messagesMember,
        setMessagesMember } = UseContext()
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        // (from, to)
        socket.emit('get_your_Message', userId, selectChat)
        socket.on("get_your_Message", (messages) => {
            setMessages(messages)
        })
        socket.emit('get_his_Message', selectChat, userId)
        socket.on("get_his_Message", (messages) => {
            setMessagesMember(messages)
        })
    }, [selectChat])
    return (
        <div className="px-5 overflow-y-scroll h-screen  ">
            <div className=" space-y-3">
                {
                    messages.map((items) => {
                        return (
                            <div key={items._id} className=" bg-blue-500 w-fit py-2 px-3 rounded-lg">
                                {items.content}
                            </div>
                        )
                    })
                }
            </div>
            <div className="space-y-2 flex flex-col items-end ">
                {
                    messagesMember.map((items) => {
                        return (
                            <div key={items._id} className=" bg-green-500 w-fit py-2 px-3 rounded-lg">
                                {items.content}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MessageFrom