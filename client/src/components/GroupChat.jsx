import axios from 'axios'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { CloseIcon } from '../assets/Icons/Close'

const GroupChat = ({ setOnpenCreateGroup }) => {
    const [groupName, setGroupName] = useState("");
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [selectedUserToGroup, setSelectedUserToGroup] = useState([]);
    const token = localStorage.getItem("token");

    const getSearchUsers = useCallback(async () => {
        try {
            const config = {
                headers: {
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

    const handleUsers = (id, name) => {
        setSelectedUserToGroup((users) => [...users, { id, name }])
    }
    const removeFromSelectdUser = (id) => {
        setSelectedUserToGroup(users => {
            return users.filter(users => {
                const user = selectedUserToGroup.find((user) => user.id == id)
                return users !== user
            })
        })
    }

    const CreateGroup = async () => {
        try {
            const users = selectedUserToGroup.map((user) => user.id)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.post("/chat/group", { name: groupName, users }, config)
            console.log(data);
            setOnpenCreateGroup(false)
        } catch (error) {
            console.error(error);
        }

    }


    return (
        <div className='  fixed top-0 left-0 h-full w-full bg-black/30 flex justify-center items-center z-50'>
            <div className='bg-white px-3 pb-5 rounded-md w-[250px] sm:w-[300px] md:w-[350px] lg:w-[450px]'>
                <div className='py-2 flex justify-between border-b'>
                    <div className=''>
                        <h3 className=' text-sm sm:text-[16px]'>Create Group</h3>
                    </div>
                    <button
                        onClick={() => {
                            setOnpenCreateGroup(false)
                        }}
                        className=' hover:bg-red-500 rounded-full p-[1px] group duration-300'>
                        <CloseIcon className={'h-6 w-6 group-hover:text-white duration-300'} />
                    </button>
                </div>
                <form className='pt-3' >
                    <div className='space-y-3'>
                        <div>
                            <input
                                value={groupName}
                                onChange={(e) => { setGroupName(e.target.value) }}
                                type="text"
                                placeholder='Enter group name.'
                                className='border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:border focus:border-indigo-200 py-1 pl-1 placeholder:text-sm' />
                        </div>
                        <div>
                            <input
                                value={keyword}
                                onChange={(e) => { setKeyword(e.target.value) }}
                                type="text"
                                placeholder='Add User.'
                                className='border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:border focus:border-indigo-200 py-1 pl-1 placeholder:text-sm' />
                        </div>
                    </div>
                </form>
                <div className='pt-3 flex gap-2'>
                    {
                        selectedUserToGroup?.map((item) => {
                            return (
                                <div key={item.id} className=' bg-indigo-500 rounded-full px-2 flex gap-2 '>
                                    <h4 className='text-xs font-semibold text-white'>
                                        {item.name.split(" ")[0]}
                                    </h4>
                                    <button
                                        onClick={() => {
                                            removeFromSelectdUser(item.id)
                                        }}
                                        className=''>
                                        <CloseIcon className={'h-3 w-3 text-white'} />
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className=' space-y-3 mt-2 max-h-32 overflow-y-auto scrollbar-hide'>
                    {users.map((item) => {
                        return (
                            <button
                                onClick={() => {
                                    handleUsers(item._id, item.name)
                                }}
                                key={item._id}
                                className="px-2 py-1 w-full flex gap-3 border-b-2 border-indigo-50 hover:border-indigo-800 group hover:bg-indigo-500 duration-300 rounded-md">
                                <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                                    <img src={item.picture} alt="" />
                                </div>
                                <div>
                                    <h4 className=' group-hover:text-white duration-300'>{item.name.split(" ")[0]}</h4>
                                </div>
                            </button>
                        )
                    })}
                </div>
                <div className='flex gap-3 w-full mt-3'>
                    <button
                        onClick={CreateGroup}
                        className=' bg-green-500 w-full rounded-md py-1 font-semibold text-white hover:bg-green-600  duration-300'> Create</button>
                </div>
            </div>
        </div>
    )
}

GroupChat.propTypes = {
    setOnpenCreateGroup: PropTypes.func.isRequired
}

export default GroupChat