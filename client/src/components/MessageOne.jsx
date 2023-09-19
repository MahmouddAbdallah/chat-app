import { Send } from '../assets/Icons/Send'
import { Plus } from '../assets/Icons/Plus'
import MessageFrom from './MessageFrom'
import { UseContext } from '../context/appContext'
import { useState } from 'react'
const MessageOne = () => {
    const { socket, selectChat, setMessages } = UseContext()
    const [message, setMessage] = useState("")
    const userId = localStorage.getItem('userId')
    const sendMessage = (event) => {
        event.preventDefault()
        // (content, from, to)
        socket.emit("new_message", message, userId, selectChat)
        socket.on("new_message", (message) => {
            setMessages((msg) => [...msg, message])
        })
        setMessage("")
    }
    return (

        <div className="pt-2 h-full ">
            {
                selectChat ?
                    <div className="h-full flex flex-col justify-between">
                        <div className=''>
                            <MessageFrom />
                        </div>
                        <div>
                            <form onSubmit={sendMessage} className="flex fixed b">
                                <button className='bg-white flex items-center px-4'>
                                    <Plus className='w-6 h-6 plusRotate animate-spi' />
                                </button>
                                <input
                                    value={message}
                                    onChange={(e) => { setMessage(e.target.value) }}
                                    type="text"
                                    placeholder='Type a message '
                                    className=" w-full py-3 focus:outline-none placeholder:text-black/50 placeholder:font-[400]"
                                />
                                <button
                                    className='bg-white flex items-center px-4'>
                                    <Send className='w-6 h-6' />
                                </button>
                            </form>
                        </div>
                    </div>
                    :
                    <div className='flex justify-center items-center h-full'>
                        select message
                    </div>
            }
        </div>
    )
}

export default MessageOne;