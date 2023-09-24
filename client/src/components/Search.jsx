import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { UseContext } from '../context/appContext'
import axios from 'axios'
import { SearchIcon } from '../assets/Icons/Search'

const Search = ({ setToggle }) => {
    const [users, setUsers] = useState([])
    const [keyword, setKeyword] = useState("")
    const { setSelectChatId, setChats, chats, token } = UseContext()
    const getSearchUsers = useCallback(async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = keyword === "" ? [] : await axios.get(`/user?keyword=${keyword}`, config)
            if (keyword === "") {
                setUsers([])
            } else {
                setUsers(data.user)
            }
        } catch (error) {
            console.error(error);
        }
    }, [keyword, token])
    useEffect(() => {
        getSearchUsers()
    }, [getSearchUsers])

    const accessChat = async (userId) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.post("/chat", { userId }, config)
            console.log(data);
            if (!chats.find((chat) => chat._id === data._id)) {
                setChats((chat) => [...chat, data])
            }
            setSelectChatId(data._id)
            setToggle(false)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <div className="min-h-screen w-52 bg-slate-200 rounded-lg overflow-y-auto shadow-sm ">
                <form>
                    <div className="flex">
                        <input
                            value={keyword}
                            onChange={(e) => { setKeyword(e.target.value) }}
                            type="text" placeholder="Search new chat..." className=" w-full py-1 focus:outline-none px-2 placeholder:text-sm peer" />
                        <button className="bg-white px-2 peer-focus:text-indigo-400" ><SearchIcon className={'h-4 w-4'} /></button>
                    </div>
                </form>
                <div>
                    <div className="">
                        {users.map((item) => {

                            return (
                                <button
                                    key={item._id}
                                    onClick={() => {
                                        accessChat(item._id)
                                    }}
                                    className="px-2 py-1 w-full flex gap-3 border-b border-indigo-200">
                                    <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                                        <img src={item.picture} alt="" />
                                    </div>
                                    <div>
                                        <h4>{item.name.split(" ")[0]}</h4>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

Search.propTypes = {
    setToggle: PropTypes.func.isRequired

}

export default Search