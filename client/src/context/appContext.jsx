import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'
import { io } from 'socket.io-client';
const SOCKET_URL = 'http://localhost:8000'

const appContex = createContext()
export const ProviderContext = ({ children }) => {
    const socket = io(SOCKET_URL);
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [messagesMember, setMessagesMember] = useState([])
    const [selectChat, setSelectChat] = useState("")
    return (
        <appContex.Provider value={{
            socket,
            users,
            setUsers,
            messages,
            setMessages,
            selectChat,
            setSelectChat,
            messagesMember,
            setMessagesMember
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
