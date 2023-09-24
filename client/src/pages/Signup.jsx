import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { Camera } from "../assets/Icons/Camera"

const SignUp = () => {
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("");
    const [selectImage, setSelectImage] = useState("");
    const navigate = useNavigate()
    const inputFile = useRef()
    const openInputFile = useRef()

    const signup = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append("picture", selectImage)
            formData.append("name", name)
            formData.append("email", email)
            formData.append("password", password)
            const { data } = await axios.post('/auth/signup', formData)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            navigate("/chat")
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        const btn = openInputFile.current;
        btn.addEventListener('click', handleinputfile)
        return () => {
            btn.removeEventListener('click', handleinputfile)
        }
    })
    const handleinputfile = (e) => {
        e.preventDefault()
        const input = inputFile.current
        input.click()
    }
    const handleOnChangeInputFile = (e) => {
        const selectFile = e.target.files[0]
        const createImgURL = URL.createObjectURL(selectFile);
        setImage(createImgURL)
        setSelectImage(selectFile)
    }
    if (token) {
        return <Navigate to={"/chat"} />
    }
    return (
        <>
            <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8  h-screen">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Create an account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-5" >
                        <div>
                            <div className="flex justify-center items-center ">
                                <div className="group w-32 h-32 bg-red-300 rounded-full overflow-hidden">
                                    {image ? <img className="w-32 h-32 object-cover" src={`${image}`} /> : <img className="w-32 h-32 object-cover" src="https://marketplace.canva.com/EAFewoMXU-4/1/0/1600w/canva-purple-pink-gradient-man-3d-avatar-0o0qE2T_kr8.jpg" alt="" />}
                                    <input ref={inputFile} type="file" onChange={handleOnChangeInputFile} hidden />
                                    <div className="relative ">
                                        <button ref={openInputFile} className=" absolute bg-black/30 h-16 w-32 bottom-0 left-0 hidden transition duration-500  group-hover:flex justify-center items-center">
                                            <Camera className={'h6 w-6 text-white'} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Full name
                            </label>
                            <div className="mt-2">
                                <input
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    required
                                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm  focus:outline-none ring-1 ring-inset focus:ring-2  placeholder:text-gray-400  focus:ring-offset-3  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
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
                                onClick={signup}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp