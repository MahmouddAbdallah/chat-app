import { useEffect } from "react"
import { UseContext } from "../context/appContext"
import axios from 'axios'


const Sidebar = () => {
    const { socket, members, setMembers, setCurrentRoom, } = UseContext()
    useEffect(() => {
        setCurrentRoom("general");
        getRooms();
        socket.emit("join-room", "general")
        socket.emit("new-user")
    }, [])
    socket.on("new-user", (users) => {
        setMembers(users)
    })
    const getRooms = async () => {
        try {
            const { data } = await axios.get("/chat/room")
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            {
                members.map(
                    (items) => {
                        return (
                            <div key={items._id}>
                                {items.name}
                            </div>
                        )
                    }
                )}
        </div>
    )
}

export default Sidebar