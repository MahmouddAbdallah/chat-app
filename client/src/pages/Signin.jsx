import { useState } from "react"
import axios from 'axios'
import { UseContext } from "../context/appContext"
import { Link, Navigate, useNavigate } from 'react-router-dom'
const Signin = () => {
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { socket } = UseContext()
    const navigate = useNavigate()
    const signin = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post('/auth/signin', { password, email })
            localStorage.setItem("token", data.token)
            localStorage.setItem("userId", data.user._id)
            //
            socket.emit('new-user')

            navigate("/chat")
        } catch (error) {
            console.error(error);
        }
    }
    if (token) {
        return <Navigate to={"/chat"} />
    }
    return (
        <>
            <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8  h-screen">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm  focus:outline-none ring-1 ring-inset focus:ring-2  placeholder:text-gray-400  focus:ring-offset-3  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="  block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm  focus:outline-none ring-1 ring-inset focus:ring-2  placeholder:text-gray-400  focus:ring-offset-3  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                onClick={signin}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300"
                            >
                                Sign in
                            </button>
                        </div>
                        <div className="text-center">
                            <p>don&#39;t have an account? <span><Link to={"/signup"} className=" text-indigo-600 font-semibold hover:underline">sing up</Link></span></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signin
