import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"
import MessageOne from "../components/MessageOne";
import Leftbar from "../components/Leftbar";

const Chat = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to={"/signin"} />
    }
    return (
        <div className=" px-0 lg:px-5 ">
            <div className="h-full flex">
                <Leftbar />
                <div className="grid grid-cols-10 w-full">
                    <div className=" col-span-3 lg:col-span-2">
                        <Sidebar />
                    </div>
                    <div className=" col-span-7 lg:col-span-8">
                        <MessageOne />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat