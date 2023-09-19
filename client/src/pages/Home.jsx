import { Navigate } from "react-router-dom";

const Home = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to={"/chat"} />
    }
    return (
        <div>Home</div>
    )
}

export default Home