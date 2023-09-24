import { Send } from '../assets/Icons/Send'
import { Plus } from '../assets/Icons/Plus'
// import MessageFrom from './MessageFrom'
import { UseContext } from '../context/appContext'
import { useState } from 'react'
import axios from 'axios'
import MessageFrom from './MessageFrom'
const MessageOne = () => {
    const { selectChatId, token, setMessages } = UseContext()
    const [content, setContent] = useState("")



    const sendMessage = async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.post("/message", {
                content,
                chatId: selectChatId
            }, config)
            // socket.emit("send-message", data.message)
            setMessages(msgs => [...msgs, data.message])
            document.getElementById("chatmessage").scrollTop += 100
            setContent("")
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div className="h-full border-r-2">
            {
                selectChatId ?
                    <div className=" relative h-full ">
                        <div className="border-b-2 pb-2">
                            <div className="pt-3 px-2">
                                <h2 className="font-semibold ">My Chat</h2>
                            </div>
                        </div>
                        <div id='chatmessage' className='h-[85.7vh] overflow-y-scroll scrollbar-hide '>
                            <div>
                                <MessageFrom />
                            </div>
                        </div>
                        <div className=' absolute w-full bottom-0 left-0'>
                            <form
                                onSubmit={sendMessage}
                                className="flex ">
                                <button className='bg-white flex items-center px-4'>
                                    <Plus className='w-6 h-6 plusRotate animate-spi' />
                                </button>
                                <input
                                    value={content}
                                    onChange={(e) => { setContent(e.target.value) }}
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