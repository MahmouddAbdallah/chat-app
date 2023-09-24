import axios from "axios";
import { UseContext } from "../context/appContext"
import { useCallback, useEffect } from "react";
const MessageFrom = () => {
    const { token, user, messages, setMessages, selectChatId } = UseContext()
    const getMessages = useCallback(
        async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axios.get(`/message/${selectChatId}`, config)
                setMessages(data.messages)
                document.getElementById("chatmessage").scrollTo(0, document.body.scrollHeight);
            } catch (error) {
                console.error(error);
            }
        }
        , [selectChatId, setMessages, token])
    useEffect(() => {
        getMessages()
    }, [getMessages])


    return (
        <div >
            {messages.map((item) => {
                return (
                    <div key={item._id}>
                        <div className={`${user._id == item.sender ? "flex justify-end " : "justify-start"} px-1 py-2`}>
                            <span className={`${user._id == item.sender ? "flex justify-end bg-indigo-500 text-white" : "bg-indigo-50"} px-1 py-2 rounded-md`}>
                                {item.content}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageFrom