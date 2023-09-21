import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"
import MessageOne from "../components/MessageOne";

const Chat = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    if (!token) {
        return <Navigate to={"/signin"} />
    }
    return (
        <div className=" ">
            <div>
                <button onClick={() => {
                    localStorage.clear()
                    navigate("/signup")
                }}>
                    log out
                </button>
            </div>
            <div className=" grid grid-cols-12 min-h-screen">
                <div className=" col-span-4 border-black/10 border-r-2">
                    <Sidebar />
                </div>
                <div className=" col-span-8 h-full">
                    <MessageOne />
                </div>

            </div>
        </div>
    )
}

export default Chat