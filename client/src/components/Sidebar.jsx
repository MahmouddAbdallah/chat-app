import axios from "axios";
import { UseContext } from "../context/appContext"
import { useCallback, useEffect, useState } from "react";
import { GroupIcon } from "../assets/Icons/Group";
import GroupChat from "./GroupChat";

const Sidebar = () => {
    const [onpenCreateGroup, setOnpenCreateGroup] = useState(false)
    const { chats, setChats, setSelectChatId, token, user } = UseContext()
    const userId = user._id


    const fetchChats = useCallback(async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.get("/chat", config)
            setChats(data)

        } catch (error) {
            console.error(error);
        }
    }, [setChats, token])
    useEffect(() => {
        fetchChats();
    }, [fetchChats])

    return (
        <div className=" min-h-screen flex flex-col gap-3 shadow-md">
            <div className=" flex justify-between items-center border-b-2 pb-2">
                <div className="pt-3 px-2">
                    <h2 className="font-semibold ">Chats</h2>
                </div>
                <div className="pt-3 px-2">
                    <button
                        onClick={() => {
                            setOnpenCreateGroup(!onpenCreateGroup);
                        }}
                        className=" flex gap-1 items-center">
                        <h2 className="text-xs font-semibold">New group</h2>
                        <div className=" bg-green-600 text-white p-[2px] rounded-full">
                            <GroupIcon className={"h-3 w-3"} />
                        </div>
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-1 overflow-y-auto scrollbar-hide">
                {
                    chats.map((item) => {
                        const user = [item.users.find((user) => user._id != userId)]
                        return (
                            <button className=" relative pt-1 pb-2 px-2 group bg-indigo-50 hover:bg-indigo-500 duration-300 rounded-md "
                                onClick={() => { setSelectChatId(item._id) }} key={item._id}>
                                {
                                    item.isGroupChat
                                        ?
                                        <div className="flex gap-2 items-cente">
                                            <div className=" h-8 w-8 rounded-full overflow-hidden bg-blue-500">
                                            </div>
                                            <div>
                                                <h4 className="text-black group-hover:text-white duration-300 font-semibold">
                                                    <p>{item?.chatName.split(" ")[0]}</p>
                                                </h4>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            {
                                                user.map((user) => (
                                                    <div key={user._id} className="flex gap-2">
                                                        <div className=" h-8 w-8 rounded-full overflow-hidden">
                                                            <img className="h-8 w-8 object-cover" src={user.picture} alt="" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-black group-hover:text-white duration-300 font-semibold">
                                                                {user.name.split(" ")[0]}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                }
                                {/* <div className=" absolute flex items-start ml-10 bottom-1 text-black group-hover:text-white duration-300">
                                    <span className="text-xs group-hover:font-semibold">
                                        message :
                                    </span>
                                    <span className="text-xs">&#160;{item.latestMessage.content}</span>
                                </div> */}
                            </button>
                        )
                    })
                }
            </div>
            <div>
                {
                    onpenCreateGroup
                    &&
                    <GroupChat setOnpenCreateGroup={setOnpenCreateGroup} />
                }
            </div>
        </div>
    )
}

export default Sidebar