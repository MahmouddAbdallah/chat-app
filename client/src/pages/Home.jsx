import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import hero from '../assets/hero.png'
import Footer from "../components/Footer";
const Home = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to={"/chat"} />
    }
    return (
        <div>
            <Navbar />
            <div className="p-5">
                <div className="grid grid-cols-12 gap-10">
                    <div className=" col-span-12 lg:col-span-8">
                        <img src={hero} alt="" className=" w-full h-[500px] lg:h-[550px]  object-cover rounded-lg" />
                    </div>
                    <div className=" col-span-12 lg:col-span-4 flex lg:mt-10">
                        <span className=" md:text-lg text-base">
                            Introducing our new chat app! Communication has never been easier
                            and more convenient. Stay connected with friends, family, and colleagues
                            with our user-friendly and feature-packed chat app. Whether you&#39;re looking
                            to have a casual conversation or collaborate on a project, our app has got you covered.
                            Experience seamless messaging, voice and video calls, file sharing, and much more.
                            Download our chat app today and elevate your communication game to the next level!
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home