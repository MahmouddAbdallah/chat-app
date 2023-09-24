import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:8000'

const appContex = createContext()
export const ProviderContext = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectChatId, setSelectChatId] = useState("")
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")
  const socket = io(ENDPOINT);


  return (
    <appContex.Provider value={{
      socket,
      token,
      users,
      setUsers,
      user,
      messages,
      setMessages,
      selectChatId,
      setSelectChatId,
      chats,
      setChats,
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
