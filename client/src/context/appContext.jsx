import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'
import { io } from 'socket.io-client';
const SOCKET_URL = 'http://localhost:8000'

const appContex = createContext()
export const ProviderContext = ({ children }) => {
    const socket = io(SOCKET_URL);
    const [room, setRoom] = useState([])
    const [currentRoom, setCurrentRoom] = useState([])
    const [members, setMembers] = useState([])
    const [messages, setMessages] = useState([])
    const [privateMemberMsg, setPrivateMemberMsg] = useState([])
    const [newMessage, setNewMessage] = useState([])
    return (
        <appContex.Provider value={{
            socket, room, setRoom,
            currentRoom, setCurrentRoom,
            members, setMembers,
            messages, setMessages,
            privateMemberMsg, setPrivateMemberMsg,
            newMessage, setNewMessage
        }}>
            {children}
        </appContex.Provider>
    )
}

ProviderContext.propTypes = {
    children: PropTypes.element.isRequired
}

export const UseContext = () => {
    return useContext(appContex)
}
