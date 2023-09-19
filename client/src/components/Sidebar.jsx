import { useEffect } from "react"
import { UseContext } from "../context/appContext"


const Sidebar = () => {
    const { socket, users, setUsers, setSelectChat } = UseContext()
    useEffect(() => {
        socket.emit("all_users")
        socket.on("all_users", (users) => {
            setUsers(users)
        })
    }, [])
    return (
        <div className="flex flex-col gap-5 p-2">
            {
                users.map((items) => {
                    const selectChat = () => {
                        setSelectChat(items._id)
                    }
                    return (
                        <button
                            onClick={selectChat}
                            key={items._id}>
                            <div className="flex items-center gap-3">
                                <div>
                                    <div className=' w-10 h-10 rounded-full overflow-hidden bg-blue-500 relative'>
                                        <img src={`http://localhost:8000/${items.image}`} alt="" className="w-10 h-10 object-cover" />
                                    </div>
                                </div>
                                <div>
                                    {items.name.split(" ")[0]}
                                </div>
                            </div>
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Sidebar