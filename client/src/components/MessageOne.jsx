import { Send } from '../assets/Icons/Send'
import { Plus } from '../assets/Icons/Plus'
import { useState } from 'react'
import { UseContext } from '../context/appContext'
import MessageFrom from './MessageFrom'
const MessageOne = () => {
    const [message, setMessage] = useState("");
    const { socket, currentRoom } = UseContext()
    const userId = localStorage.getItem('userId')
    const sendMessage = (event) => {
        event.preventDefault()
        // (room, content, sender, time, date)
        socket.emit('message-room', currentRoom, message, userId, Date.now(), "20/10/2030");
        setMessage("")
    }

    return (
        <div className="pt-2 h-full ">
            <div className="h-full flex flex-col justify-between">
                <div className='flex-1'>
                    <MessageFrom />
                </div>
                <div>
                    <form onSubmit={sendMessage} className="flex ">
                        <button className='bg-white flex items-center px-4'>
                            <Plus className='w-6 h-6' />
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
        </div>
    )
}

export default MessageOne;